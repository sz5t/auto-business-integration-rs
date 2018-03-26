import {
  Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnChanges, OnInit, Output, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BsnDataTableComponent} from "@shared/business/bsn-data-table/bsn-data-table.component";
import {FormResolverComponent} from "@shared/resolver/form-resolver/form-resolver.component";
import { CnCodeEditComponent } from '@shared/components/cn-code-edit/cn-code-edit.component';
import {Validators} from "@angular/forms";
import {ApiService} from "@core/utility/api-service";
import {APIResource} from "@core/utility/api-resource";
import {AppConfigPack_Block} from "../../../model/APIModel/AppConfigPack";
import {NzMessageService} from "ng-zorro-antd";
const component: { [type: string]: Type<any> } = {
  bsnDataTable: BsnDataTableComponent,
  form_view: FormResolverComponent
};
@Component({
  selector: 'cn-component-setting-resolver',
  templateUrl: './component-setting-resolver.component.html',
})
export class ComponentSettingResolverComponent implements OnInit, OnChanges {
  @Input() config;
  @Input() blockId;
  @Input() layoutId;
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
  componentRef: ComponentRef<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
      private _http: ApiService,
      private message: NzMessageService,
      private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {

  }

  getMenuData(event) {
    console.log(event);
    this.createBsnComponent(event);
    //this.config = event;
  }


  ngOnChanges() {
    //console.log(this.layoutId);
    this.createBsnComponent();
  }

  createBsnComponent(event?) {
    if(event) {
      this.config = event;
    }
    if(this.config && this.config.component) {
      if (!component[this.config.component]) {
        const supportedTypes = Object.keys(component).join(', ');
        throw new Error(
          `Trying to use an unsupported types (${this.config.component}).Supported types: ${supportedTypes}`
        );
      }
      this.container.clear();
      const comp = this.resolver.resolveComponentFactory<any>(component[this.config.component]);
      this.componentRef = this.container.createComponent(comp);
      this.componentRef.instance.config = this.config.config;
      if(this.componentRef.instance.dataList) {
        this.componentRef.instance.dataList = this.config.dataList;
      }
    }

      /*if(this.config && this.config.component) {
        if (!component[this.config.component]) {
          const supportedTypes = Object.keys(component).join(', ');
          throw new Error(
            `Trying to use an unsupported types (${this.config.component}).Supported types: ${supportedTypes}`
          );
        }
        this.container.clear();
        const comp = this.resolver.resolveComponentFactory<any>(component[this.config.component]);
        this.componentRef = this.container.createComponent(comp);
        this.componentRef.instance.config = this.config.config;
        if(this.componentRef.instance.dataList) {
          this.componentRef.instance.dataList = this.config.dataList;
        }
      }*/
    //}
    // this.submitSelectedComponent.emit(this.config);

  }

  _saveComponent() {
    const body: AppConfigPack_Block = {
      ParentId: this.layoutId,
      Name: this.config.component, // 组件名称
      TagA: this.blockId,
      TagB:''
    };
    this._http.postProj(APIResource.AppConfigPack, body).subscribe(result=> {
      if(result && result.Status=== 200) {
          this.message.success('保存成功');
        }else {
          this.message.warning(`出现异常: ${result.Message}`);
        }
      }, error => {
        this.message.error(`出现错误：${error}`)
      }
    );
  }

}
