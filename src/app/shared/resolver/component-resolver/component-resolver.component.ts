import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-component-resolver',
  templateUrl: './component-resolver.component.html',
})
export class ComponentResolverComponent implements OnInit {
  @Input() config;
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {

  }

  createMenu($event){
    if(3 === $event.switch){
      // 右键创建弹出组件菜单
    }
  }

}
