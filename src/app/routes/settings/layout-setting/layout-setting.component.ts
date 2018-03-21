import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'layout-setting',
  templateUrl: './layout-setting.component.html',
})
export class LayoutSettingComponent implements OnInit {
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
  _layoutOptions =  [
    {
      value: {
        title: '标题 1',
        rows: [
          {
            row: {
              cols: [
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
      label: '单页面'
    },
    {
      value: {
        title: '标题 1',
        rows: [
          {
            row: {
              cols: [
                {
                  title: '区域1',
                  span:6,
                  size: {
                    nzXs: 24,
                    nzSm: 24,
                    nzMd: 6,
                    nzLg: 6,
                    ngXl: 6
                  }
                },
                {
                  title: '区域2',
                  span:18,
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
      label: '左右结构'
    },
    {
      value: 'up_down',
      label: '上下结构'
    },
    {
      value: 'left_up_down',
      label: 'T1 型结构'
    },
    {
      value: 'up_left_right',
      label: 'T2 型结构'
    },
    {
      value: 'down_left_right',
      label: 'T3 型结构'
    }
  ];
  _funcValue = {};
  _layoutValue = {};
  formGroup: FormGroup;
  _formConfig;
  constructor(private http: _HttpClient) {
  }

  ngOnInit() {
    //this._layoutValue = this._layoutOptions[0].value;
  }

  _changeValue($event) {
    console.log($event);
  }

}
