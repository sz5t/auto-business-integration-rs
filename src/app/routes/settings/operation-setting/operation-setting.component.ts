import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-operation-setting',
  templateUrl: './operation-setting.component.html',
})
export class OperationSettingComponent implements OnInit {
  _funcOptions =  [
    {
      value: 'm_1',
      label: '模块 1',
      children: [
        {
          value: 'f_1',
          label: '功能 1',
          isLeaf: true
        },
        {
          value: 'f_2',
          label: '功能 2',
          isLeaf: true
        }
      ],
    },
    {
      value: 'm_2',
      label: '模块 2',
      children: [
        {
          value: 'f2_1',
          label: '功能 1',
          isLeaf: true
        }
      ]
    }
  ];
  _funcValue;
  _editorConfig = {
    title: '标题 1',
    rows:[
      {
        row: {
          cols:[
            {
              title: '区域1',
              span:24,
              size: {
                nzXs: 24,
                nzSm: 24,
                nzMd: 24,
                nzLg: 24,
                ngXl: 24
              },
              tabs:[
                {
                  title:'基本属性',
                  icon: '',
                  active: true,
                  viewCfg: [
                    {
                      'viewId': '0001',
                      'component': 'form_view',
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
                  ]
                },
                {
                  title: 'SQL 语句',
                  icon: '',
                  active: false,
                  viewCfg: [
                    {
                      viewId:'opt_sql',
                      component:'sqlEditor'
                    },
                    {
                      'viewId': 'operation_sqlColumns',
                      'component': 'bsnDataTable',
                      'config': {
                        'keyId': 'key',
                        'nzIsPagination': false, // 是否分页
                        'nzShowTotal': true,// 是否显示总数据量
                        'pageSize': 5, //默认每页数据条数
                        'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
                        'nzLoading': false, // 是否显示加载中
                        'nzBordered': false,// 是否显示边框
                        'columns': [
                          {
                            title: '主键', field: 'key', width: 80, hidden: true, editor: {
                            type: 'input',
                            field:'key',
                            options: {
                              'type': 'input',
                              'labelSize': '6',
                              'controlSize': '10',
                              'inputType': 'text',
                            }
                          }
                          },
                          {
                            title: '姓名', field: 'name', width: 80,
                            editor: {
                              type: 'input',
                              field:'name',
                              options: {
                                'type': 'input',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'text',
                              }
                            }
                          },
                          {
                            title: '性别', field: 'sexname', width: 80, hidden: false,
                            editor: {
                              type: 'select',
                              field:'sex',
                              options: {
                                'type': 'select',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'submit',
                                'name': 'sex',
                                'label': '性别',
                                'notFoundContent': '',
                                'selectModel': false,
                                'showSearch': true,
                                'placeholder': '-请选择-',
                                'disabled': false,
                                'size': 'default',
                                'clear': true,
                                'width': '60px',
                                'options': [
                                  {
                                    'label': '男',
                                    'value': '1',
                                    'disabled': false
                                  },
                                  {
                                    'label': '女',
                                    'value': '2',
                                    'disabled': false
                                  }
                                ]
                              }
                            }
                          },
                          {
                            title: '年龄', field: 'age', width: 80, hidden: false,
                            editor: {
                              type: 'input',
                              field:'age',
                              options: {
                                'type': 'input',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'text',
                              }
                            }
                          },
                          {
                            title: '地址', field: 'address', width: 80, hidden: false,
                          }
                        ]
                      },
                      'dataList': []
                    },
                    {
                      'viewId': 'operation_sqlColumns',
                      'component': 'bsnDataTable',
                      'config': {
                        'keyId': 'key',
                        'nzIsPagination': false, // 是否分页
                        'nzShowTotal': true,// 是否显示总数据量
                        'pageSize': 5, //默认每页数据条数
                        'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
                        'nzLoading': false, // 是否显示加载中
                        'nzBordered': false,// 是否显示边框
                        'columns': [
                          {
                            title: '主键', field: 'key', width: 80, hidden: true, editor: {
                            type: 'input',
                            field:'key',
                            options: {
                              'type': 'input',
                              'labelSize': '6',
                              'controlSize': '10',
                              'inputType': 'text',
                            }
                          }
                          },
                          {
                            title: '姓名', field: 'name', width: 80,
                            editor: {
                              type: 'input',
                              field:'name',
                              options: {
                                'type': 'input',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'text',
                              }
                            }
                          },
                          {
                            title: '性别', field: 'sexname', width: 80, hidden: false,
                            editor: {
                              type: 'select',
                              field:'sex',
                              options: {
                                'type': 'select',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'submit',
                                'name': 'sex',
                                'label': '性别',
                                'notFoundContent': '',
                                'selectModel': false,
                                'showSearch': true,
                                'placeholder': '-请选择-',
                                'disabled': false,
                                'size': 'default',
                                'clear': true,
                                'width': '60px',
                                'options': [
                                  {
                                    'label': '男',
                                    'value': '1',
                                    'disabled': false
                                  },
                                  {
                                    'label': '女',
                                    'value': '2',
                                    'disabled': false
                                  }
                                ]
                              }
                            }
                          },
                          {
                            title: '年龄', field: 'age', width: 80, hidden: false,
                            editor: {
                              type: 'input',
                              field:'age',
                              options: {
                                'type': 'input',
                                'labelSize': '6',
                                'controlSize': '10',
                                'inputType': 'text',
                              }
                            }
                          },
                          {
                            title: '地址', field: 'address', width: 80, hidden: false,
                          }
                        ]
                      },
                      'dataList': []
                    }
                  ]
                },
                {
                  title: '表单设置',
                  icon: '',
                  active: false,
                  viewCfg: [
                    {
                      viewId:'opt_base',
                      component:'form_view'
                    }
                  ]
                },
                // {
                //   title: '确认操作设置',
                //   icon: '',
                //   active: false,
                //   viewCfg: {}
                // },
                // {
                //   title: '弹出窗体设置',
                //   icon: '',
                //   active: false,
                //   viewCfg: {}
                // },
                // {
                //   title: '设置预览',
                //   icon: '',
                //   active: false,
                //   viewCfg: {}
                // }
              ]
            }
          ]
        }
      },
    ]
  };
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
  }
  _changeValue($event) {
    // console.log($event);
  }

}
