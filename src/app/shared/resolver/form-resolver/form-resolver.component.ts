import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cn-form-resolver',
  templateUrl: './form-resolver.component.html',
})
export class FormResolverComponent implements OnInit, OnChanges {

  @Input() config = [
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
  ];

  @Input() dataList;
  form: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
      private http: _HttpClient,
      private formBuilder: FormBuilder
  ) { }

  get controls() {
    return this.config.filter(({type}) => {
      return type !== 'button' && type !== 'submit';
    });
  }

  get changes() {
    return this.form.valueChanges;
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  ngOnInit() {
    this.form = this.createGroup();
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map(item => item.name);

      controls
        .filter(control => !configControls.includes(control))
        .forEach(control => this.form.removeControl(control));
      configControls
        .filter(control => !controls.includes(control))
        .forEach(name => {
          const config = this.config.find(control => control.name === name);
          this.form.addControl(name, this.createControl(config));
        });
    }
  }
  createGroup() {
    const group = this.formBuilder.group({});
    this.controls.forEach(control => group.addControl(control.name, this.createControl(control)));
    return group;
  }

  createControl(config) {
    const {disabled, validation, value} = config;
    return this.formBuilder.control({disabled, value}, validation);
  }

  getFormControl(name) {
    return this.form.controls[name];
  }

  _submitForm($event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.value);
    this.submit.emit(this.value);
  }
}
