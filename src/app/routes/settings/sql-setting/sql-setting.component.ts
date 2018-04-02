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
      'url': 'Sinoforce.Resource.DbCommonConfig',
      'ajaxType': 'get',
      /*'params': [
        { name: 'moduleId', type: 'tempValue', valueName: '_Id', value: '' }
      ]*/
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
        title: 'SQL 语句', field: 'sqlText', width: 80,
        editor: {
          type: 'input',
          field: 'sqlText',
          options: {
            'type': 'input',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'text',
          }
        }
      },
      {
        title: '执行方式', field: 'sqlExecType', width: 80, hidden: false,
        editor: {
          type: 'select',
          field: 'sqlExecType',
          options: {
            'type': 'select',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'submit',
            'name': 'sqlExecType',
            'label': '',
            'notFoundContent': '',
            'selectModel': false,
            'showSearch': true,
            'placeholder': '-请选择-',
            'disabled': false,
            'size': 'default',
            'clear': true,
            'width': '80px',
            'options': [
              {
                'label': '执行一次',
                'value': '1',
                'disabled': false
              },
              {
                'label': '执行两次',
                'value': '2',
                'disabled': false
              }
            ]
          }
        }
      },
      {
        title: '执行状态', field: 'sqlExecStatus', width: 80, hidden: false,
        editor: {
          type: 'select',
          field: 'sqlExecStatus',
          options: {
            'type': 'select',
            'labelSize': '6',
            'controlSize': '10',
            'inputType': 'submit',
            'name': 'sex',
            'label': '',
            'notFoundContent': '',
            'selectModel': false,
            'showSearch': true,
            'placeholder': '-请选择-',
            'disabled': false,
            'size': 'default',
            'clear': true,
            'width': '80px',
            'options': [
              {
                'label': '新增',
                'value': '1',
                'disabled': false
              },
              {
                'label': '编辑',
                'value': '2',
                'disabled': false
              }
            ]
          }
        }
      }
    ],
    'toolbar': [
      { 'name': 'refresh', 'class': 'editable-add-btn', 'text': '刷新' },
      { 'name': 'addRow', 'class': 'editable-add-btn', 'text': '新增' },
      { 'name': 'updateRow', 'class': 'editable-add-btn', 'text': '修改' },
      { 'name': 'deleteRow', 'class': 'editable-add-btn', 'text': '删除' },
      {
        'name': 'saveRow', 'class': 'editable-add-btn', 'text': '保存' ,
        'ajaxConfig': {
          add: {
            'url': 'AppConfigPack',
            'ajaxType': 'post',
            'params': [
              { name: 'ParentId', type: 'tempValue', valueName: '_Id', value: '' },
              /*                   { name: 'Name', type: 'tempValue', valueName: '取值参数名称', value: 'liutest11' },*/
              { name: 'TagA', type: 'GUID', valueName: '取值参数名称', value: 'GUID' },
              { name: 'TagB', type: 'value', valueName: '取值参数名称', value: 'opt_sqlList' },
              { name: 'Metadata', type: 'tempValue', valueName: 'dataList', value: '' }
            ]
          },
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
          _Id: this._funcValue[this._funcValue.length -1],
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
