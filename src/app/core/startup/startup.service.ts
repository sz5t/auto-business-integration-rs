import { Router } from '@angular/router';
import { Injectable, Injector, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ACLService } from '@delon/acl';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import {CacheService} from '@delon/cache';
import {environment} from '@env/environment';
import {APIResource} from '@core/utility/api-resource';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable()
export class StartupService {
    constructor(
        private menuService: MenuService,
        private cacheService: CacheService,
        private settingService: SettingsService,
        private aclService: ACLService,
        private titleService: TitleService,
        @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
        private httpClient: HttpClient,
        // private router: Router,
        private injector: Injector) {
    }

    private viaHttp(resolve: any, reject: any) {
        zip(
            this.httpClient.get(APIResource.localUrl)
        ).pipe(
            // 接收其他拦截器后产生的异常消息
            catchError(([appData]) => {
                resolve(null);
                return [appData];
            })
        ).subscribe(([appData]) => {

            // application data
            const res: any = appData;

            if(!this.cacheService.getNone('IsSettings')) {
              this.cacheService.clear();
              this.tokenService.clear();
              this.cacheService.set('Menus', res.menu);
            }

            const User: any = this.cacheService.getNone('User');
            const Menus: any = this.cacheService.getNone('Menus');

            // 应用信息：包括站点名、描述、年份
            this.settingService.setApp(res.app);
            // 用户信息：包括姓名、头像、邮箱地址
            this.settingService.setUser(User);
            // this.settingService.setUser(res.user);
            // ACL：设置权限为全量
            this.aclService.setFull(true);


            // 初始化菜单
            if(this.cacheService.getNone('IsSettings') === 'LOGING') {
              environment.SERVER_URL = APIResource.LoginUrl;
            }
            else if(this.cacheService.getNone('IsSettings') === 'SETTING'){
              environment.SERVER_URL = APIResource.SettingUrl;
            }
            this.menuService.add(Menus);

            // 设置页面标题的后缀
            this.titleService.suffix = res.app.name;

        },
        () => { },
        () => {
            resolve(null);
        });
    }

    private viaMock(resolve: any, reject: any) {
        // const tokenData = this.tokenService.get();
        // if (!tokenData.token) {
        //     this.injector.get(Router).navigateByUrl('/login');
        //     resolve({});
        //     return;
        // }
        // mock
        const app: any = {
            name: `自动化业务装配系统`,
            description: `自动化业务装配系统`
        };
        const user: any = {
            name: 'Admin',
            avatar: './assets/img/zorro.svg',
            email: 'admin@sinoforce.com',
            token: '123456789'
        };
        // 应用信息：包括站点名、描述、年份
        this.settingService.setApp(app);
        // 用户信息：包括姓名、头像、邮箱地址
        this.settingService.setUser(user);
        // ACL：设置权限为全量
        this.aclService.setFull(true);
        // 初始化菜单
        this.menuService.add(
            [
                {
                    text: '主导航',
                    group: true,
                    children: [
                        {
                            text: '仪表盘',
                            icon: 'icon-speedometer'
                        },
                        {
                            text: '快捷菜单',
                            icon: 'icon-rocket',
                            // shortcut_root: true
                        }
                    ]
                }
            ]
        );

        // 设置页面标题的后缀
        this.titleService.suffix = app.name ;

        resolve({});
    }

    load(): Promise<any> {

        return new Promise((resolve, reject) => {
                this.viaHttp(resolve, reject);
        });
    }
}
