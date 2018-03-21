import {MenuService, SettingsService, User} from '@delon/theme';
import {Component, OnDestroy, Inject, Optional, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Md5} from 'ts-md5/dist/md5';
import {CacheService} from '@delon/cache';

@Component({
    selector: 'passport-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.less' ],
    providers: [ SocialService ]
})
export class UserLoginComponent implements OnDestroy {

    form: FormGroup;
    error = '';
    type = 0;
    loading = false;
    onlineUser: OnlineUser;

    appUser: AppUser;
    constructor(
        fb: FormBuilder,
        private cacheService: CacheService,
        private httpClient: HttpClient,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private menuService: MenuService,
        @Optional() @Inject(ReuseTabService,
            ) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(1)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
            captcha: [null, [Validators.required]],
            remember: [true]
        });
    }

    // region: fields

    get userName() { return this.form.controls.userName; }
    get password() { return this.form.controls.password; }
    get mobile() { return this.form.controls.mobile; }
    get captcha() { return this.form.controls.captcha; }

    // endregion

    switch(ret: any) {
        this.type = ret.index;
    }

    // region: get captcha

    count = 0;
    interval$: any;

    getCaptcha() {
        this.count = 59;
        this.interval$ = setInterval(() => {
            this.count -= 1;
            if (this.count <= 0)
                clearInterval(this.interval$);
        }, 1000);
    }

    setHeaders() {
        const userToken = this.tokenService.get().token;
        return new HttpHeaders()
            .set('Credential', userToken['Token'] ? userToken['Token'] : '')
            .set('X-Requested-With', 'XMLHttpRequest')
            .set('Cache-Control', 'no-cache');
    }
    // endregion

    submit() {
        this.error = '';
        if (this.type === 0) {
            this.userName.markAsDirty();
            this.password.markAsDirty();
            if (this.userName.invalid || this.password.invalid) return;
        } else {
            this.mobile.markAsDirty();
            this.captcha.markAsDirty();
            if (this.mobile.invalid || this.captcha.invalid) return;
        }
        // mock http
        this.loading = false;
        setTimeout(() => {
            this.loading = false;
            if (this.type === 0) {
                this.onlineUser = new OnlineUser();
                this.onlineUser.Identify = this.userName.value;
                this.onlineUser.Password = Md5.hashStr(this.password.value).toString().toUpperCase();
                this.httpClient.request<any>(
                    'POST',
                     'SinoForce.Data.OnlineUser',
                    {
                        body: this.onlineUser
                    })
                    .toPromise()
                    .then(response => {
                        this.onlineUser = {...response.Data};
                        if (!this.onlineUser.Online) {
                            this.error = this.onlineUser.Message;
                            return null;
                        }
                        return response;
                }).then( param => {
                        if (param) {
                            this.tokenService.set({
                                token: param.Data
                            });
                            this.httpClient.request<any>(
                                'GET',
                                 'SinoForce.Data.AppUser/' + param.Data.UserId,
                                {
                                    headers: this.setHeaders()
                                }).toPromise()
                                .then((response) => {
                                    this.appUser = {...response.Data};
                                    this.settingsService.setUser(this.appUser);
                                    this.cacheService.set('User', this.appUser);
                                    return this.httpClient.request(
                                        'GET',
                                         'SinoForce.Data.SysCommonCode',
                                        {
                                            params: {
                                                name : '{WEB应用运行平台}',
                                                ApplyId : 'ApplyId'
                                            },
                                            headers: this.setHeaders()
                                        }
                                    ).toPromise();
                                })
                                .then( commonCode => {
                                    return this.httpClient.request<any>(
                                        'GET',
                                         'SinoForce.AppProject.AppModuleConfig',
                                        {
                                            params: {
                                                ProjId: this.onlineUser.ProjId,
                                                ApplyId: commonCode['Data'][0].Id,
                                                PlatCustomerId: commonCode['Data'][0].PlatCustomerId
                                            },
                                            headers: this.setHeaders()
                                        }
                                    ).toPromise();
                                } )
                                .then((menuList) => {

                                    this.menuService.clear();
                                    this.menuService.add(JSON.parse(menuList.Data[0].ConfigData));
                                    this.cacheService.set('Menus', JSON.parse(menuList.Data[0].ConfigData));
                                    return this.httpClient.request(
                                        'GET',
                                         'SinoForce.Data.AppPermission/Func.SinoForceWeb端',
                                        {
                                            headers: this.setHeaders()
                                        }
                                    ).toPromise();
                                })
                                .then((appPermission) => {
                                    if (appPermission['Status'].toString() === '200') {
                                        this.router.navigate(['/']);
                                    }
                                })
                                .catch(errMsg => {
                                    this.error = errMsg;
                                });
                        }
                    }

                ).catch( errMsg => {
                    this.error = errMsg;
                });
           }
        }, 1000);


        // 清空路由复用信息
        if(this.reuseTabService){
            this.reuseTabService.clear();
        }
        // 保存当前用户信息
        this.tokenService.set({
            token: '000'
        });
    }

    // region: social

    // open(type: string, openType: SocialOpenType = 'href') {
    //     let url = ``;
    //     let callback = ``;
    //     if (environment.production)
    //         callback = 'https://cipchk.github.io/ng-alain/callback/' + type;
    //     else
    //         callback = 'http://localhost:4200/callback/' + type;
    //     switch (type) {
    //         case 'auth0':
    //             url = `//cipchk.auth0.com/login?client=8gcNydIDzGBYxzqV0Vm1CX_RXH-wsWo5&redirect_uri=${decodeURIComponent(callback)}`;
    //             break;
    //         case 'github':
    //             url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
    //             break;
    //         case 'weibo':
    //             url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
    //             break;
    //     }
    //     if (openType === 'window') {
    //         this.socialService.login(url, '/', {
    //             type: 'window'
    //         }).subscribe(res => {
    //             if (res) {
    //                 this.settingsService.setUser(res);
    //                 this.router.navigateByUrl('/');
    //             }
    //         });
    //     } else {
    //         this.socialService.login(url, '/', {
    //             type: 'href'
    //         });
    //     }
    // }

    // endregion

    ngOnDestroy(): void {
        if (this.interval$) clearInterval(this.interval$);
    }

}

export class OnlineUser{
    Id: string;
    Identify: string;
    IdentifyType: string;
    IP: string;
    LoginTime: string;
    MacAddr: string;
    Message: string;
    Online: boolean;
    OrgList: any[];
    Password: string;
    PlatCustomerId: string;
    PrivId: string;
    ProjId: string;
    ProjList: any[];
    TryTimes: number;
    RemainTimes: number;
    Token: string;
    UserId: string;
    ValidCode: string;
    ValidCodeId: string;

}

export class AppUser implements  User {
    Birthday?: string;
    Code: string;
    CreateTime: string;
    Grender: string;
    Id: string;
    IdCardNumber: string;
    LoginLimitKind: string;
    MailAddress: string;
    MobileNumber: string;
    Name: string;
    NickName: string;
    Password: string;
    PersonId: string;
    PlatCustomerId: string;
    RealName: string;
    Remark: string;
    Status: string;
    UserType: string;
    name = this.RealName;
    email = this.MailAddress;
}
