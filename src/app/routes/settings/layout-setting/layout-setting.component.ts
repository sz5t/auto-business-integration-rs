import {Component, OnInit} from '@angular/core';
import {_HttpClient} from '@delon/theme';
import {FormBuilder, FormGroup} from "@angular/forms";
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
      },
      label: '左右结构'
    },
    {
      value:  {
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
      },
      label: '上下结构'
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
                  rows:[
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
                    },
                    {
                      row: {
                        cols: [
                          {
                            title: '区域3',
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
          },
          {
            name: 'area3',
            title: '区域 3',
            data: [
              {
                'type': 'input',
                'labelSize': '12',
                'controlSize': '12',
                'inputType': 'text',
                'name': 'area3_title',
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
                'name': 'area3_icon',
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
                'name': 'area3_color',
                'label': '颜色',
                'placeholder': '',
                'disabled': false,
                'readonly': false,
                'size': 'default',
              },
            ]
          }
        ]
      },
      label: 'T1 型结构'
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
                  title: '区域1',
                  span:12,
                  size: {
                    nzXs: 12,
                    nzSm: 12,
                    nzMd: 12,
                    nzLg: 12,
                    ngXl: 12
                  }
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
                  },
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
          },
          {
            name: 'area3',
            title: '区域 3',
            data: [
              {
                'type': 'input',
                'labelSize': '12',
                'controlSize': '12',
                'inputType': 'text',
                'name': 'area3_title',
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
                'name': 'area3_icon',
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
                'name': 'area3_color',
                'label': '颜色',
                'placeholder': '',
                'disabled': false,
                'readonly': false,
                'size': 'default',
              },
            ]
          }
        ]
      },
      label: 'T2 型结构'
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
                  span:12,
                  size: {
                    nzXs: 12,
                    nzSm: 12,
                    nzMd: 12,
                    nzLg: 12,
                    ngXl: 12
                  }
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
                  },
                }
              ]
            }
          },
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
                'name': 'area3_title',
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
                'name': 'area3_icon',
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
                'name': 'area3_color',
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
          },
          {
            name: 'area3',
            title: '区域 3',
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
      },
      label: 'T3 型结构'
    }
  ];
  _funcValue;
  _layoutValue;
  _formGroup: FormGroup;
  _editorConfig;
  constructor(
    private http: _HttpClient,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this._formGroup = this.formBuilder.group({});
  }

  get controlsData() {
    return this._editorConfig.filter(({type}) => {
      return type !== 'button';
    });
  }

  get controls() {
    return this._editorConfig.filter(({type}) => {
      return type !== 'button';
    });
  }

  get changes() {
    return this._formGroup.valueChanges;
  }

  get valid() {
    return this._formGroup.valid;
  }

  get value() {
    return this._formGroup.value;
  }

  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(controlData => {
      controlData.data.forEach(control => {
        group.addControl(control.name, this.createControl(control));
      });

    });
    return group;
  }

  createControl(config) {
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
  }

  _changeValue($event) {
    // console.log($event);
  }

  _changeLayout($event) {
    this._editorConfig = $event.layoutEditor;
    this._formGroup = this.createGroup();
  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this._formGroup.reset();
    for(const key in this._formGroup.controls){
      this._formGroup.controls[key].markAsPristine();
    }
  }

  _submitForm($event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.value);
    console.log(this._layoutValue)
  }
}
