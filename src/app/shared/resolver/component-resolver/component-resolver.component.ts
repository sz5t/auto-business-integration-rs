import {
  Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {BsnDataTableComponent} from "@shared/business/bsn-data-table/bsn-data-table.component";
const component: { [type: string]: Type<any> } = {
  bsnDataTable: BsnDataTableComponent
};
@Component({
  selector: 'cn-component-resolver',
  templateUrl: './component-resolver.component.html',
})
export class ComponentResolverComponent implements OnInit, OnChanges {
  @Input() config;
  componentRef: ComponentRef<any>;
  @ViewChild('body', { read: ViewContainerRef }) container: ViewContainerRef;
  menuConfig = [
  {
    label: '表格组件',
    value : {},
    children: [
      {
        label: '数据网格',
        value : {
          component:'bsnDataTable'
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
      private http: _HttpClient,
      private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if(this.config){
      this.createBsnComponent();
    }

  }

  ngOnChanges() {
    if (this.componentRef) {
      this.componentRef.instance.config = this.config;
    }
  }

  createBsnComponent() {
    if (!component[this.config.component]) {
      const supportedTypes = Object.keys(component).join(', ');
      throw new Error(
        `Trying to use an unsupported types (${this.config.component}).Supported types: ${supportedTypes}`
      );
    }
    this.container.clear();
    const comp = this.resolver.resolveComponentFactory<any>(component[this.config.component]);
    this.componentRef = this.container.createComponent(comp);
    this.componentRef.instance.config = this.config;
  }

  getMenuData(event) {
    this.config = event;
    this.createBsnComponent();
  }

}
