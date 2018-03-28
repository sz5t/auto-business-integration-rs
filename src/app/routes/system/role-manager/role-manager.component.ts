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

    constructor(
      private cacheService: CacheService,
      private apiService: ApiService
    ) { }

    clear()
    {

    }

    ngOnInit() {
    }


}
