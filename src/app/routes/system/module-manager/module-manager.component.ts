import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-module-manager',
  templateUrl: './module-manager.component.html',
})
export class ModuleManagerComponent implements OnInit {
    _layout = {
      title: '模块管理',
      rows:[
        {
          row: {
            cols:[
              {
                title: '区域1',
                span:6,
                size: {
                  nzXs: 6,
                  nzSm: 6,
                  nzMd: 6,
                  nzLg: 6,
                  ngXl: 6
                }
              },
              {
                title: '区域2',
                span:18,
                size: {
                  nzXs: 18,
                  nzSm: 18,
                  nzMd: 18,
                  nzLg: 18,
                  ngXl: 18
                },
                rows: [
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
                          }
                        },
                        {
                          title: '区域1',
                          span:24,
                          size: {
                            nzXs: 24,
                            nzSm: 24,
                            nzMd: 24,
                            nzLg: 24,
                            ngXl: 24
                          }
                        }
                      ]
                    }
                  },
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
                          }
                        },
                        {
                          title: '区域1',
                          span:24,
                          size: {
                            nzXs: 24,
                            nzSm: 24,
                            nzMd: 24,
                            nzLg: 24,
                            ngXl: 24
                          }
                        }
                      ]
                    }
                  }
                ]
              },
            ]
          }
        },
        {
          row: {
            cols:[
              {
                title: '区域1',
                span:12,
                size: {
                  nzXs: 12,
                  nzSm: 12,
                  nzMd: 12,
                  nzLg: 12,
                  ngXl: 12
                },
                tabs:[
                  {
                    title:'tab 1',
                    icon: '',
                    active: true,
                    viewCfg: {}
                  },
                  {
                    title: 'tab 2',
                    icon: '',
                    active: false,
                    viewCfg: {}
                  }
                ]
              },
              {
                title: '区域1',
                span:12,
                size: {
                  nzXs: 12,
                  nzSm: 12,
                  nzMd: 12,
                  nzLg: 12,
                  ngXl: 12
                }
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
}
