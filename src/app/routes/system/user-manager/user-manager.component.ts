import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ApiService} from '@core/utility/api-service';
import {APIResource} from '@core/utility/api-resource';
import {environment} from '@env/environment';
import {CacheService} from '@delon/cache';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
})
export class UserManagerComponent implements OnInit {
  content:any;
  contentConfigPack:any;
  contentModule:any;

  addcontent:any;
  addcontentConfigPack:any;
  addcontentModule:any;

  putcontent:any;
  putcontentConfigPack:any;
  putcontentModule:any;

  delcontent:any;
  delcontentConfigPack:any;
  delcontentModule:any;
  // location: Location;
    constructor(
      private cacheService: CacheService,
      private apiService: ApiService,
      private location: Location
    ) { }

    ngOnInit() {
    }

    clear()
    {
      this.content = '';
      this.contentConfigPack = '';
      this.contentModule = '';

      this.addcontent = '';
      this.addcontentConfigPack = '';
      this.addcontentModule = '';

      this.putcontent = '';
      this.putcontentConfigPack = '';
      this.putcontentModule = '';

      this.delcontent = '';
      this.delcontentConfigPack = '';
      this.delcontentModule = '';
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
    this.apiService.getProj(APIResource.AppModuleConfig, {_select : 'Id,Name'}).toPromise().then(
      response => {
        this.contentModule = JSON.stringify(response.Data);
      }
    );
  }

  getAppConfigPack()
  {
    this.clear();
    this.apiService.getProj(APIResource.AppConfigPack, {
      _select: 'Id,Name'
    }).toPromise().then(
      response => {
        this.contentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

  addUser()
  {
    this.clear();
    this.apiService.post(APIResource.AppUser,
      {
        "UserType":"测试账号",
        "Name":"test",
        "Code":"180306986165123",
        "Password":"6",
        "OrgId":"333",
        "RealName":"测试",
        "NickName":"测试",
        "Gender":"Male",
        "LoginLimitKind":"None",
        "Status":"Normal",
        "Remark":null,
        "Id":'46d5c928d26b47c0a70235479bb9cfd4'
      }).toPromise().then(
      response => {
        this.addcontent = JSON.stringify(response.Data);
      }
    );
  }

  addModule()
  {
    this.clear();
    this.apiService.postProj(APIResource.AppModuleConfig, ).toPromise().then(
      response => {
        this.addcontentModule = JSON.stringify(response.Data);
      }
    );
  }

  addAppConfigPack()
  {
    this.clear();
    this.apiService.postProj(APIResource.AppConfigPack, ).toPromise().then(
      response => {
        this.addcontentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

  putUser()
  {
    this.clear();
    this.apiService.put(APIResource.AppUser, {
      Id: '46d5c928d26b47c0a70235479bb9cfd4'},{
    "PersonId":" ",
      "UserType":"修改了测试账号",
      "Name":"test",
      "Code":"188888986165123",
      "Password":"6",
      "OrgId":"888",
      "RealName":"测试88",
      "NickName":"测试88",
      "Gender":"Male",
      ID:'46d5c928d26b47c0a70235479bb9cfd4'
  }).toPromise().then(
      response => {
        this.putcontent = JSON.stringify(response.Data);
      }
    );
  }

  putModule()
  {
    this.clear();
    this.apiService.putProj(APIResource.AppModuleConfig, {_select : 'Id,Name'}).toPromise().then(
      response => {
        this.putcontentModule = JSON.stringify(response.Data);
      }
    );
  }

  putAppConfigPack()
  {
    this.clear();
    this.apiService.putProj(APIResource.AppConfigPack, {
      _select: 'Id,Name'
    }).toPromise().then(
      response => {
        this.putcontentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

  delUser()
  {
    this.clear();
    this.apiService.delete(APIResource.AppUser, {
      Id: '46d5c928d26b47c0a70235479bb9cfd4'}).toPromise().then(
      response => {
        if(response.Data) {
          this.delcontent = JSON.stringify(response.Data);
        }
      }
    );
  }

  delModule()
  {

    this.clear();
    this.apiService.deleteProj(APIResource.AppModuleConfig, {_select : 'Id,Name'}).toPromise().then(
      response => {
        this.delcontentModule = JSON.stringify(response.Data);
      }
    );
  }

  delAppConfigPack()
  {
    // console.log(1111,this.location);
    this.clear();
    this.apiService.deleteProj(APIResource.AppConfigPack, {
      _select: 'Id,Name'
    }).toPromise().then(
      response => {
        this.delcontentConfigPack = JSON.stringify(response.Data);
      }
    );
  }

}
