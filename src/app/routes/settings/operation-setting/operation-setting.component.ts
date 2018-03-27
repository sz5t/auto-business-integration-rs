import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Validators } from "@angular/forms";
import { ApiService } from '@core/utility/api-service';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonUtility } from '@core/utility/Common-utility';
import { APIResource } from '@core/utility/api-resource';

@Component({
  selector: 'app-operation-setting',
  templateUrl: './operation-setting.component.html',
})
export class OperationSettingComponent implements OnInit {
  _funcOptions = [];
  _funcValue;
  _layoutValue;
  _selectedModuleText;
  // 布局列表数据
  _layoutList = [];
  _editorConfig = {
    title: '标题 1',
    rows: [
      {
        row: {
          cols: [
            {
              title: '区域1',
              span: 24,
              size: {
                nzXs: 24,
                nzSm: 24,
                nzMd: 24,
                nzLg: 24,
                ngXl: 24
              },
              tabs: [
                {
                  title: '基本属性',
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
                          'validation': [Validators.required, Validators.minLength(6)]
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
                          'notFoundContent': '',
                          'selectModel': false,
                          'showSearch': true,
                          'placeholder': '--请选择--',
                          'disabled': false,
                          'size': 'default',
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
                          'placeholder': ['--开始日期--', '--结束日期--'],
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
                      viewId: 'opt_sql',
                      component: 'sqlEditor'
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
                              field: 'key',
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
                              field: 'name',
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
                              field: 'sex',
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
                              field: 'age',
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
                              field: 'key',
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
                              field: 'name',
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
                              field: 'sex',
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
                              field: 'age',
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
                      viewId: 'opt_base',
                      component: 'form_view'
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
    private http: _HttpClient,
    private _http: ApiService,
    private message: NzMessageService,
  ) { }


  _changeValue($event) {
    // console.log($event);
  }
  async ngOnInit() {
    const params = { _select: 'Id,Name,ParentId' };
    const moduleData = await this.getModuleData(params);
    // 初始化模块列表，将数据加载到及联下拉列表当中
    this._funcOptions = this.arrayToTree(moduleData.Data, '');
  }
  // 获取布局设置列表
  getLayoutConfigData(params) {
    return this._http.getProj(APIResource.AppConfigPack, params).toPromise();
  }

  // 获取模块信息
  async getModuleData(params) {
    return this._http.getProj(APIResource.AppModuleConfig, params).toPromise();
  }

  // 选择布局名称
  async  _changeLayoutName($event) {
    // 创建布局
    // this._layoutConfig = $event.metadata;
    const str = [];
    if ($event.metadata) {
      const componentData = await this.getComponentByLayout($event.id);
      let componentJson = [];
      console.log("componentData:", componentData);
      if (componentData && componentData.Status === 200) {
        componentJson = componentData.Data;
      }
      this.nodes = this.arrayToTreeBylayout(this.layoutToarry($event.metadata, componentJson, '555'), '555');
    }

  }

  /**生成结构树-》 布局简析 */
  layoutToarry(data?, component?, pid?) {
    let result = [];
    let temp;
    if (data.rows) {
      data.rows.forEach(rdata => {
        if (rdata.row.cols) {
          rdata.row.cols.forEach(cdata => {
            const obj = { "Name": cdata.title, "Id": cdata.id, "ParentId": pid };
            if (cdata.rows) {
              temp = this.layoutToarry(cdata, component, pid) //递归调用行
            }
            if (temp) {
              if (temp.length > 0) {
                result = [...result, ...temp]
              }
            }
            if (!cdata.rows) {
              result.push(obj);
              const cobj = this.componentToarry(component, cdata.id, component);
              if (cobj) {
                result = [...result, ...cobj]
              }
            }
          });
        }
      });
    }

    if (data.tabs) {
      data.tabs.forEach(tab => {
        const obj = { "Name": tab.name, "Id": tab.id, ParentId: pid };
        result.push(obj);
        const cobj = this.componentToarry(component, tab.id, component);
        if (cobj) {
          result = [...result, ...cobj]
        }
      });
    }
    return result;
  }
  /**生成结构树-》组件简析 */
  componentToarry(data?, pid?, component?) {

    let obj = [];
    let temp;
    if (data) {
      const a = {};
      const index = data.findIndex(item => item.TagA === pid);
      if (data[index].Name=== 'tabs') {
        a["Id"] = data[index].Id;
        a["Name"] = data[index].Name;
        a["ParentId"] = data[index].TagA;
        obj.push(a);
        if (data[index].Name === 'tabs') {
          temp = this.layoutToarry({ tabs: JSON.parse(data[index].Metadata) }, component, data[index].Id) //递归调用行
          if (temp) {
            obj = [...obj, ...temp]
          }
        }
      }
    }
    return obj;
  }


  async  getComponentByLayout(layoutId?) {
    const params = {
      ParentId: layoutId
    };
    return this._http.getProj(APIResource.AppConfigPack, params).toPromise();
  }


  // 改变模块选项
  _changeModuleValue($event?) {
    this._layoutList = [];
    // 选择功能模块，首先加载服务端配置列表
    //const params = new HttpParams().set('TagA', this._funcValue.join(','));
    if (this._funcValue.length > 0) {
      const params = {
        TagA: this._funcValue.join(','),
        _select: 'Id,Name,Metadata'
      };
      this.getLayoutConfigData(params).then(serverLayoutData => {
        if (serverLayoutData.Status === 200 && serverLayoutData.Data.length > 0) {
          serverLayoutData.Data.forEach((data, index) => {
            const metadata = JSON.parse(data.Metadata);
            this._layoutList.push({ label: data.Name, value: { id: data.Id, metadata: metadata } });
          });
        } else {
          this._layoutList = [];
        }

      });
    }
  }
  _onSelectionChange(selectedOptions: any[]) {
    this._selectedModuleText = `【${selectedOptions.map(o => o.label).join(' / ')}】`;
  }

  arrayToTreeBylayout(data, parentid) {
    const result = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
      if (data[i].ParentId == parentid) {
        const obj = { "name": data[i].Name, "id": data[i].Id };
        temp = this.arrayToTreeBylayout(data, data[i].Id);
        if (temp.length > 0) {
          obj['children'] = temp;
        } else {
          obj["isLeaf"] = true;
        }
        result.push(obj);
      }
    }
    return result;
  }
  arrayToTree(data, parentid) {
    const result = [];
    let temp;
    for (let i = 0; i < data.length; i++) {
      if (data[i].ParentId == parentid) {
        const obj = { "label": data[i].Name, "value": data[i].Id };
        temp = this.arrayToTree(data, data[i].Id);
        if (temp.length > 0) {
          obj['children'] = temp;
        } else {
          obj["isLeaf"] = true;
        }
        result.push(obj);
      }
    }
    return result;
  }
  nodes = [

    {
      id: '1',
      name: '组件设置根节点',
      type: 'root',
      data: 'ahhahah',
      hasChildren: true,
      children: [
        {
          id: '1.2',
          name: '布局区域1',
          type: 'layout',
          hasChildren: true,
          children: [
            {
              id: '1.21',
              name: '数据表格',
              value: 'bsn-datatable',
              type: 'component',
            }
          ]
        },
        {
          id: '1.3',
          name: '布局区域2',
          type: 'layout',
          hasChildren: true,
          children: [
            {
              id: '1.31',
              name: '树',
              value: 'bsn-tree',
              type: 'component',
            }
          ]
        }
      ]
    }
  ];

  treeconfig = {
    nzAutoExpandParent: true, //是否自动展开父节点，当数字时展开最大节点 false
    nzAllowChildLinkage: true,// 是否开启父节点的checkbox状态的会影响子节点状态 true
    nzAllowParentLinkage: true,// 是否开启子节点的checkbox状态的会影响父节点状态 true
    nzCheckable: false, //  在节点之前添加一个复选框 false
    nzShowLine: false, // 显示连接线 false
  };

  /**
点击树节点 */
  onActivate(ev: any) {
    console.log('激活树节点', ev);
  }
}
