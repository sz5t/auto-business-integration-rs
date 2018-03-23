import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ApiService} from '@core/utility/api-service';
import {APIResource} from '@core/utility/api-resource';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
})
export class UserManagerComponent implements OnInit {
  content:any;
  contentConfigPack:any;
  contentModule:any;
    constructor(
      private apiService: ApiService
    ) { }

    ngOnInit() {
      this.content = "初始化信息";
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
    this.apiService.get(APIResource.AppModuleConfig, {
      _select: 'Id,Name'}).toPromise().then(
      response => {
        this.contentModule = JSON.stringify(response.Data);
      }
    );
  }

  getAppConfigPack()
  {
    this.apiService.get(APIResource.AppConfigPack, {
      _select: 'Id,Name'}).toPromise().then(
      response => {
        this.contentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

}
