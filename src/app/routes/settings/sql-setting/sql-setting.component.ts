import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ApiService} from "@core/utility/api-service";
import {APIResource} from "@core/utility/api-resource";
import {RelativeService} from "@core/relative-Service/relative-service";

@Component({
  selector: 'cn-sql-setting',
  templateUrl: './sql-setting.component.html',
})
export class SqlSettingComponent implements OnInit {

  _moduleId;
  _funcValue;
  _funcOptions = [];
  _sqlDataConfig = {
    'viewId': 'viewId_sqlSetting',
    'keyId': 'key',
    'nzIsPagination': true, // 是否分页
    'nzShowTotal': true,// 是否显示总数据量
    'pageSize': 5, //默认每页数据条数
    'nzPageSizeSelectorValues': [5, 10, 20, 30, 40, 50],
    'nzLoading': true, // 是否显示加载中
    'nzBordered': false,// 是否显示边框
    'ajaxConfig': {
      'url': {
        parent:'SysDataCategoryLink',
        child: 'DbCommandConfig',
        params: [
          {
            type: 'value', value: '_parent'
          }
        ]
        //self
      },
      'ajaxType': 'get',
      'params': [
        { name: '_parent.LeftId', type: 'tempValue', valueName: '_moduleId', value: '' },
        { name: '_parent.LinkNote', type: 'value', value: 'sql' },
      ]
    },
    'componentType': {
      'parent': true,
      'child': false,
      'own': true
    },
    'relation': [
      {
        'relationViewId': 'operation_sqlColumns',
        'relationSendContent': [
         /* {
            name: 'selectRow',
            sender: 'operation_sqlColumns',
            receiver: 'operation_sqlParams',
            relationData: {
              name: 'refreshAsChild',
              params: [{ pid: 'key', cid: '_parentId' }]
            },
          }*/
        ],
        'relationReceiveContent': []
      }
    ],
    'columns': [
      {
        title: '主键', field: 'key', width: 'auto', hidden: true
      },
      {
        title: '名称', field: 'Name', width: 80,
        editor: {
          type: 'input',
          field: 'Name',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: 'SQL 语句', field: 'ScriptText', width: 80,
        editor: {
          type: 'input',
          field: 'ScriptText',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '脚本类型', field: 'DbOjbType', width: 80,
        editor: {
          type: 'input',
          field: 'DbOjbType',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '对象状态', field: 'DbOjbState', width: 80,
        editor: {
          type: 'input',
          field: 'DbOjbState',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '发布状态', field: 'IssueFlag', width: 80,
        editor: {
          type: 'input',
          field: 'IssueFlag',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '结果类型', field: 'ResultType', width: 80,
        editor: {
          type: 'input',
          field: 'ResultType',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '应用范围', field: 'ShareScope', width: 80,
        editor: {
          type: 'input',
          field: 'ShareScope',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '应用类型', field: 'References', width: 80,
        editor: {
          type: 'input',
          field: 'References',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '是否启用', field: 'Enabled', width: 80,
        editor: {
          type: 'input',
          field: 'Enabled',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
    ],
    'toolbar': [
      { 'name': 'refresh', 'class': 'editable-add-btn', 'text': '刷新' },
      { 'name': 'addRow', 'class': 'editable-add-btn', 'text': '新增' },
      { 'name': 'updateRow', 'class': 'editable-add-btn', 'text': '修改' },
      { 'name': 'deleteRow', 'class': 'editable-add-btn', 'text': '删除' },
      {
        'name': 'saveRow', 'class': 'editable-add-btn', 'text': '保存' ,
        'ajaxConfig': {
          add: [
            {
              'url': 'DbCommandConfig',
              'ajaxType': 'post',
              'params': [
                { name: 'Name', type: 'componentValue', valueName: 'Name', value: '' },
                { name: 'ScriptText', type: 'componentValue', valueName: 'ScriptText', value: '' },
                { name: 'DbOjbType', type: 'componentValue', valueName: 'DbOjbType', value: '' },
                { name: 'DbOjbState', type: 'componentValue', valueName: 'DbOjbState', value: '' },
                { name: 'IssueFlag', type: 'componentValue', valueName: 'IssueFlag', value: '' },
                { name: 'ResultType', type: 'componentValue', valueName: 'ResultType', value: '' },
                { name: 'ShareScope', type: 'componentValue', valueName: 'ShareScope', value: '' },
                { name: 'References', type: 'componentValue', valueName: 'References', value: '' },
                { name: 'Enabled', type: 'componentValue', valueName: 'Enabled', value: '' }
              ],
              'output': [
                {
                  name: '_dataId',
                  type: '',
                  dataName: 'Id'
                }
              ]
            },
            {
              'url': 'SysDataCategoryLink',
              'ajaxType': 'post',
              'params': [
                { name: 'LeftId', type: 'tempValue', valueName: '_moduleId', value: '' },
                { name: 'RightId', type: 'tempValue', valueName: '_dataId', value: '' },
                { name: 'LinkNote', type: 'value', valueName: '', value: 'sql' }
              ]
            }
          ],
          update: {
            'url': 'AppConfigPack',
            'ajaxType': 'put',
            'params': [
              { name: 'Id', type: 'tempValue', valueName: '_id', value: '' },
              { name: 'Metadata', type: 'tempValue', valueName: 'dataList', value: '' }
            ]
          }
        },
      },
      { 'name': 'cancelRow', 'class': 'editable-add-btn', 'text': '取消' }
    ]
  };
  _paramDataConfig = {

  };
  constructor(
    private apiService: ApiService,
    private relativeMessage: RelativeService
  ) { }

  async ngOnInit() {
    const params = { _select: 'Id,Name,ParentId' };
    const moduleData = await this.getModuleData(params);
    // 初始化模块列表，将数据加载到及联下拉列表当中
    this._funcOptions = this.arrayToTree(moduleData.Data, '');
  }
  // 获取模块信息
  async getModuleData(params) {
    return this.apiService.getProj(APIResource.AppModuleConfig, params).toPromise();
  }

  // 改变模块选项
  async _changeModuleValue($event?) {
    // 选择功能模块，首先加载服务端配置列表
    //const params = new HttpParams().set('TagA', this._funcValue.join(','));
    if(this._funcValue.length >0) {
      this._moduleId = this._funcValue[this._funcValue.length -1];
      const receiver = {
        name: 'initParameters',
        receiver: 'viewId_sqlSetting' ,
        parent: {
          _moduleId: this._funcValue[this._funcValue.length -1],
        }
      };
      console.log("选中行发消息事件", receiver);
      this.relativeMessage.sendMessage({ type: 'initParameters' }, receiver);
     /* const sqlCommondData = await this.sqlRefreshData();
      this._loading = false;
      if(sqlCommondData.Data.length>0 && sqlCommondData.Status === 200) {
        this._sql_dataSet = sqlCommonData.Data.rows;
        this._sql_current = sqlCommondData.Page;
        this._sql_total = sqlCommonData.PageCount;
      }*/

    }
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

  sqlRefreshData() {
    /*const params = {
      _page: this._sql_current,
      _rows: this._sql_pageSize,
    };*/
    //return  this.apiService.get(`${APIResource.SysDataCategoryLink}/${this._moduleId}/${APIResource.DbCommonConfig}`, params).toPromise();
  }

}
