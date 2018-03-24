import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {APIResource} from '@core/utility/api-resource';
import {HttpParams} from '@angular/common/http';
import {CacheService} from '@delon/cache';
import {ApiService} from '@core/utility/api-service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
})
export class RoleManagerComponent implements OnInit {
  content:any;
  contentConfigPack:any;
  contentModule:any;
    constructor(
      private cacheService: CacheService,
      private apiService: ApiService
    ) { }

    clear()
    {
      this.content = '';
      this.contentConfigPack = '';
      this.contentModule = '';
    }

    ngOnInit() {
    }

  getUser()
  {
    this.clear();
    this.apiService.get(APIResource.AppUser, {
      _select: 'Id,RealName'}).toPromise().then(
      response => {
        this.content = JSON.stringify(response.Data);
      }
    );
  }

  getModule()
  {
    this.clear();
      this.apiService.getProj(APIResource.AppModuleConfig, {_select: 'Id,Name'}).toPromise().then(
      response => {
        this.contentModule = JSON.stringify(response.Data);
      }
    );
  }

  getAppConfigPack()
  {
    this.clear();
    this.apiService.getProj(APIResource.AppConfigPack, {
      _select: 'Id,Name',
    }).toPromise().then(
      response => {
        this.contentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

}
