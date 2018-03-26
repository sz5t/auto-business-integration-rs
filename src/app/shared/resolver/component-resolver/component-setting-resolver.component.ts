import {
  Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BsnDataTableComponent} from "@shared/business/bsn-data-table/bsn-data-table.component";
import {FormResolverComponent} from "@shared/resolver/form-resolver/form-resolver.component";
import { CnCodeEditComponent } from '@shared/components/cn-code-edit/cn-code-edit.component';
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
  menuConfig = [
    {
      label: '表格组件',
      value : {},
      children: [
        {
          label: '数据网格',
          value : {
            title: '数据网格',
            component:'bsnDataTable',
            config:{
              'viewId': '0001',
              'component': 'bsnDataTable',
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
  componentRef: ComponentRef<any>;
  @ViewChild('dynamicComponent', { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
      private http: _HttpClient,
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
    this.createBsnComponent();
  }

  createBsnComponent(event?) {
    if(event) {
      if (!component[event.component]) {
        const supportedTypes = Object.keys(component).join(', ');
        throw new Error(
          `Trying to use an unsupported types (${event.component}).Supported types: ${supportedTypes}`
        );
      }
      this.container.clear();
      const comp = this.resolver.resolveComponentFactory<any>(component[event.component]);
      this.componentRef = this.container.createComponent(comp);
      this.componentRef.instance.config = event.config;
      if(this.componentRef.instance.dataList) {
        this.componentRef.instance.dataList = event.dataList;
      }
    }else {
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

    }


  }



}
