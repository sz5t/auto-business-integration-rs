import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Validators} from "@angular/forms";

@Component({
  selector: 'cn-layout-setting-resolver',
  templateUrl: './layout-setting-resolver.component.html',
})
export class LayoutSettingResolverComponent implements OnInit {
  @Input() config;
  @Output() submitSelectedComponent:EventEmitter<any> = new EventEmitter<any>();
  _isRows = false;
  menuConfig = [
    {
      label: '表格组件',
      value : {},
      children: [
        {
          label: '数据网格',
          value : {
            viewId: '0001',
            title: '数据网格',
            component:'bsnDataTable',
            config:{
              'keyId': 'key',
              'nzIsPagination': false, // 是否分页
              'nzShowTotal': true,// 是否显示总数据量
              'pageSize': 5, //默认每页数据条数
              'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
              'nzLoading': false, // 是否显示加载中
              'nzBordered': false,// 是否显示边框
              'columns': [
                {
                  title: '主键', field: 'key', width: 80, hidden: true
                },
                {
                  title: '姓名', field: 'name', width: 80
                },
                {
                  title: '性别', field: 'sexname', width: 80, hidden: false
                },
                {
                  title: '年龄', field: 'age', width: 80, hidden: false
                },
                {
                  title: '地址', field: 'address', width: 80, hidden: false,
                }
              ]
            },
            dataList:[
              {
                key: `key0`,
                name: `用户 1`,
                age: '32',
                sexname: '女',
                sex: '1',
                address: `中国`,
              },
              {
                key: `key1`,
                name: `用户 2`,
                age: '32',
                sexname: '女',
                sex: '1',
                address: `中国`,
              },
              {
                key: `key2`,
                name: `用户 3`,
                age: '32',
                sexname: '女',
                sex: '1',
                address: `中国`,
              }
            ]
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
            viewId:'002',
            title: '基本表单',
            component:'form_view',
            'config': [
              {
                'type': 'input',
                'labelSize': '6',
                'controlSize': '10',
                'inputType': 'text',
                'name': 'userName',
                'label': '用户姓名',
                'placeholder': '例如：Company.cn.app',
                'disabled': false,
                'readonly': false,
                'size': 'default',
                'validations': [
                  {
                    'validator': 'required',
                    'errorMessage': '不能为空'
                  },
                  {
                    'validator': 'minlength',
                    'length': 6,
                    'errorMessage': '最小长度为6'
                  }
                ],
                'validation': [Validators.required,Validators.minLength(6)]
              },
              {
                'type': 'input',
                'labelSize': '6',
                'controlSize': '10',
                'inputType': 'text',
                'name': 'userPassword',
                'label': '用户密码',
                'placeholder': '',
                'disabled': false,
                'readonly': false,
                'size': 'default',
                /*'validations': [
                 {
                 'validator': 'required',
                 'errorMessage': ''
                 },
                 {
                 'validator': 'minLength',
                 'length': 6,
                 'errorMessage': ''
                 }
                 ]*/
              },
              {
                'type': 'select',
                'labelSize': '6',
                'controlSize': '10',
                'inputType': 'submit',
                'name': 'sex',
                'label': '性别',
                'notFoundContent':'',
                'selectModel': false,
                'showSearch': true,
                'placeholder':'--请选择--',
                'disabled': false,
                'size': 'default',
                'options': [
                  {
                    'label':'男',
                    'value': '1',
                    'disabled': false
                  },
                  {
                    'label':'女',
                    'value': '2',
                    'disabled': false
                  }
                ]
              },
              {
                'type': 'datePicker',
                'labelSize': '6',
                'controlSize': '10',
                'name': 'datePicker',
                'label': '日期',
                'placeholder': '--请选择日期--',
                'dateModel': 'day',
                'format': 'YYYY-MM-DD',
                'disabled': false,
                'readonly': false,
                'size': 'default'
              },
              {
                'type': 'timePicker',
                'labelSize': '6',
                'controlSize': '10',
                'format': 'HH:mm:ss',
                'name': 'timePicker',
                'label': '时间',
                'placeholder': '--请选择时间--',
                'disabled': false,
                'readonly': false,
                'size': 'default'
              },
              {
                'type': 'rangePicker',
                'labelSize': '6',
                'controlSize': '10',
                'format': 'YYYY-MM-DD',
                'name': 'dateRangePicker',
                'dateModel': 'day',
                'label': '日期',
                'placeholder': ['--开始日期--','--结束日期--'],
                'disabled': false,
                'readonly': false,
                'size': 'default'
              },
              {
                'type': 'checkbox',
                'labelSize': '6',
                'controlSize': '10',
                'name': 'checkbox',
                'label': '爱好',
                'disabled': false
              },
              {
                'type': 'checkboxGroup',
                'labelSize': '6',
                'controlSize': '10',
                'name': 'checkbox',
                'label': '特长',
                'disabled': false,
                'options': [
                  { label: 'Apple', value: 'Apple', checked: true },
                  { label: 'Pear', value: 'Pear' },
                  { label: 'Orange', value: 'Orange' }
                ]
              },
              {
                'type': 'radioGroup',
                'labelSize': '6',
                'controlSize': '10',
                'name': 'radioGroup',
                'label': '专业',
                'disabled': false,
                'options': [
                  { label: 'Apple', value: 'Apple', checked: true },
                  { label: 'Pear', value: 'Pear' },
                  { label: 'Orange', value: 'Orange' }
                ]
              },
              {
                'type': 'submit',
                'offsetSize': '6',
                'controlSize': '10',
                'name': 'submit'
              }
            ],
            'dataList': []
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
    this.submitSelectedComponent.emit(event);
  }
}
