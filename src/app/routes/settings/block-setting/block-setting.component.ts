import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-block-setting',
  templateUrl: './block-setting.component.html',
})
export class BlockSettingComponent implements OnInit {
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
  _layoutValue = {
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
      },
      {
        row: {
          cols: [
            {
              title: '区域2',
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
    ],
    layoutEditor: [
      {
        name: 'area1',
        title: '区域 1',
        data: [
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area1_title',
            'label': '标题',
            'placeholder': '',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area1_icon',
            'label': '图标',
            'placeholder': 'icon-plus',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area1_color',
            'label': '颜色',
            'placeholder': '',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
        ]
      },
      {
        name: 'area2',
        title: '区域 2',
        data: [
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area2_title',
            'label': '标题',
            'placeholder': '',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area2_icon',
            'label': '图标',
            'placeholder': 'icon-plus',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
          {
            'type': 'input',
            'labelSize': '12',
            'controlSize': '12',
            'inputType': 'text',
            'name': 'area2_color',
            'label': '颜色',
            'placeholder': '',
            'disabled': false,
            'readonly': false,
            'size': 'default',
          },
        ]
      }
    ]
  };

  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
  }

  _changeValue() {

  }
}
