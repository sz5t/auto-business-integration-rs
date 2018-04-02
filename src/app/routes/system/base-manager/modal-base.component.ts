import { Component, OnInit, Input } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
})
export class ModalBaseComponent implements OnInit {

    _name: string;

  @Input()
  set name(value: string) {
    this._name = value;
  }

  emitDataOutside() {
    this.subject.next('传出数据');
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }
    constructor(
        private http: _HttpClient,
        private subject: NzModalSubject
    ) {
        this.subject.on('onDestory' ,() => {
            console.log("destory");
        })
     }

    ngOnInit() {
    }

}
