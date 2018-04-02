import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalSubject } from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
})
export class ModalBaseComponent implements OnInit {
  validateForm: FormGroup;
    _name: any;

  @Input()
  set name(value: any) {
    this._name = JSON.stringify(value);
  }

  emitDataOutside() {
    this.subject.next('传出数据');
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }
    constructor(
        private http: _HttpClient,
        private subject: NzModalSubject,
        private fb: FormBuilder
    ) {
        this.subject.on('onDestory' ,() => {
            console.log("destory");
        })
     }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent) {
    e.preventDefault();
  }

    ngOnInit() {
      this.validateForm = this.fb.group({
        email            : [ null, [ Validators.email ] ],
        password         : [ null, [ Validators.required ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        nickname         : [ null, [ Validators.required ] ],
        phoneNumberPrefix: [ '+86' ],
        phoneNumber      : [ null, [ Validators.required ] ],
        website          : [ null, [ Validators.required ] ],
        captcha          : [ null, [ Validators.required ] ],
        agree            : [ false ]
      });
    }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

}
