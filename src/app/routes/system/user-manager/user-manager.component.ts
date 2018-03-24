import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ApiService} from '@core/utility/api-service';
import {APIResource} from '@core/utility/api-resource';
import {environment} from '@env/environment';
import {CacheService} from '@delon/cache';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
})
export class UserManagerComponent implements OnInit {
  content:any;
  contentConfigPack:any;
  contentModule:any;
    constructor(
      private cacheService: CacheService,
      private apiService: ApiService
    ) { }

    ngOnInit() {
    }

  getUser()
  {
    this.content = '我是点我按钮的输出信息';
    this.apiService.get(APIResource.AppUser, {
      _select: 'Id,RealName'}).toPromise().then(
      response => {
        this.content = JSON.stringify(response.Data);
      }
    );
  }

  getModule()
  {
    const proj =  this.cacheService.getNone('ParamsUrl');
    this.apiService.getProj(APIResource.AppModuleConfig, new HttpParams().set('_select', 'Id,Name')).toPromise().then(
      response => {
        this.contentModule = JSON.stringify(response.Data);
      }
    );
  }

  getAppConfigPack()
  {
    const proj =  this.cacheService.getNone('Proj');
    this.apiService.get(APIResource.AppConfigPack, {
      _select: 'Id,Name',
      ProjId: proj['ProjId'],
      ApplyId: proj['ApplyId']
    }).toPromise().then(
      response => {
        this.contentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

}
