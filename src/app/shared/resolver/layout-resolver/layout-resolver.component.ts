import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-layout-resolver',
  templateUrl: './layout-resolver.component.html',
})
export class LayoutResolverComponent implements OnInit {
  @Input() config;
  _isRows = false;
  menuConfig = [
    {
      label: '表格组件',
      value : {},
      children: [
        {
          label: '数据网格',
          value : {
            title: '数据网格',
            component:'bsnDataTable'
          }
        }
      ]
    },
    {
      label: '表单组件',
      value : {},
      children: [
        {
          label: '基本表单',
          value : {
            title: '基本表单',
            component:'form_view'
          }
        }
      ]
    },
    {
      label: '列表组件',
      value : {},
      children: [
        {
          label: '数据列表',
          value : {}
        }
      ]
    },
    {
      label: '树组件',
      value : {},
      children: [
        {
          label: '树组件',
          value : {}
        }
      ]
    },
    {
      label: '布局组件',
      value : {},
      children: [
        {
          label: '标签页',
          value : {}
        },
        {
          label: '分步页',
          value : {}
        },
        {
          label: '折叠面板',
          value : {}
        }
      ]
    }
  ];
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
    this._isRows = Array.isArray(this.config.rows);
  }

  getMenuData(event) {
    this.config = event;
  }

}
