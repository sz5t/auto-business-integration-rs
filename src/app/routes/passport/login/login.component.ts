import {MenuService, SettingsService, User} from '@delon/theme';
import {Component, OnDestroy, Inject, Optional, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { SocialService, SocialOpenType, ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import {CacheService} from '@delon/cache';
import {ApiService} from '@core/utility/api-service';
import {environment} from '@env/environment';
import {APIResource} from '@core/utility/api-resource';
import {AppUser, CacheInfo } from '../../../model/APIModel/AppUser';
import {OnlineUser } from '../../../model/APIModel/OnlineUser';


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
    cacheInfo: CacheInfo;

    constructor(
        fb: FormBuilder,
        private cacheService: CacheService,
        private httpClient: HttpClient,
        private router: Router,
        public msg: NzMessageService,
        private settingsService: SettingsService,
        private socialService: SocialService,
        private menuService: MenuService,
        private apiService: ApiService,

        @Optional() @Inject(ReuseTabService,
            ) private reuseTabService: ReuseTabService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
        this.form = fb.group({
            userName: [null, [Validators.required, Validators.minLength(1)]],
            password: [null, Validators.required],
            mobile: [null, [Validators.required, Validators.minLength(1)]],
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
        // if(ret.index === 0)
        //   console.log('配置平台');
        // else
        //   console.log('运行平台');
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
          this.onlineUser = new OnlineUser();
          this.cacheInfo = new CacheInfo();
            this.loading = false;
            if (this.type === 0) {
              this.onlineUser.Identify = this.userName.value;
              this.onlineUser.Password = Md5.hashStr(this.password.value).toString().toUpperCase();
              environment.SERVER_URL = APIResource.SettingUrl;
              environment.COMMONCODE = APIResource.SettingCommonCode;
              this.cacheService.set('IsSettings','SETTING');
           }else {
              this.onlineUser.Identify = this.mobile.value;
              this.onlineUser.Password = Md5.hashStr(this.captcha.value).toString().toUpperCase();
              environment.SERVER_URL = APIResource.LoginUrl;
              environment.COMMONCODE = APIResource.LoginCommonCode;
              this.cacheService.set('IsSettings','LOGING');
            }
          // this.tokenService.clear();

          this.apiService.post(APIResource.OnlineUser, this.onlineUser).toPromise()
            .then(response => {
              this.onlineUser = {...response.Data};
              if (!this.onlineUser.Online) {
                this.error = this.onlineUser.Message;
                return null;
              }
              this.cacheService.set('OnlineUser', this.onlineUser);
              this.cacheInfo.ProjectId = this.onlineUser.ProjId;
              this.cacheInfo.PlatCustomerId = this.onlineUser.PlatCustomerId;

              return response;
            }).then( param => {
              if (param) {
                this.tokenService.set({
                  token: param.Data.Token
                });
                this.apiService.get(APIResource.AppUser + '/' + param.Data.UserId)
                  .toPromise()
                  .then((response) => {
                    this.appUser = {...response.Data};
                    this.settingsService.setUser(this.appUser);
                    this.cacheInfo.RealName = this.appUser.RealName;
                    this.cacheService.set('User', this.appUser);
                    return this.apiService.get(APIResource.SysCommonCode, {
                      name : environment.COMMONCODE,
                      ApplyId : 'ApplyId'
                    }).toPromise();
                  })
                  .then( commonCode => {
                    this.cacheInfo.ApplyId = commonCode['Data'][0].Id;
                    this.cacheService.set('ParamsUrl', this.cacheInfo);
                    return this.apiService.get(APIResource.AppModuleConfig,{
                      ProjId: this.onlineUser.ProjId,
                      ApplyId: commonCode['Data'][0].Id,
                      PlatCustomerId: commonCode['Data'][0].PlatCustomerId
                    } ).toPromise();
                  } )
                  .then((menuList) => {

                    if(environment.COMMONCODE === APIResource.LoginCommonCode) {
                      //todo:将拿到的数据进行解析加载
                      menuList.Data.forEach( menu =>{
                        if(menu.ConfigData != ''){
                        this.menuService.add(JSON.parse(menu.ConfigData));
                        this.cacheService.set('Menus', JSON.parse(menu.ConfigData));
                      }} )
                    }else
                    {
                      this.httpClient.get<any>(APIResource.localUrl).toPromise().then( apprem => {
                        this.cacheService.set('Menus', apprem.menu);
                        this.menuService.add(apprem.menu);
                      } )
                    }

                    return this.apiService.get(APIResource.AppPermission + '/Func.SinoForceWeb端').toPromise();
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
            this.error = errMsg ;
          });
        }, 1000);


        // 清空路由复用信息
        if (this.reuseTabService){
            this.reuseTabService.clear();
        }

        // 保存当前用户信息
        this.tokenService.set({
            token: 'unll'
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

