import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-grid-input',
  templateUrl: './cn-grid-input.component.html',
})
export class CnGridInputComponent implements OnInit {
    @Input() config;
     value;
    constructor(
        private http: _HttpClient
    ) { }
    ngOnInit() {
    }

    setValue(value){
       this.value=value;
    }

}
