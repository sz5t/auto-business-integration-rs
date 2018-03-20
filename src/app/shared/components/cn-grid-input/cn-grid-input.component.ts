import {Component, Input, OnInit, EventEmitter,Output} from '@angular/core';
import { _HttpClient } from '@delon/theme';
@Component({
  selector: 'cn-grid-input',
  templateUrl: './cn-grid-input.component.html',
})
export class CnGridInputComponent implements OnInit {
    @Input() config;
    @Output() updateValue =new EventEmitter();
    @Input()  value;
    constructor(
        private http: _HttpClient
    ) { }
    ngOnInit() {
    }

    setValue(value){
       this.value=value;
    }

    getValue(){
        return this.value;
    }

    userNameChange(name?){
        console.log('input值发生变化',name);
        this.updateValue.emit(name);
        console.log('input值发生变化后触发',name);
    }
}
