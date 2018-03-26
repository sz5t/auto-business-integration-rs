import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-layout-setting-resolver',
  templateUrl: './layout-setting-resolver.component.html',
})
export class LayoutSettingResolverComponent implements OnInit {
  @Input() config;
  _isRows = false;
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
    this._isRows = Array.isArray(this.config.rows);
  }
  getMenuData(event) {
    console.log(event);
    this.config = event;
    //this.config = event;
  }
}
