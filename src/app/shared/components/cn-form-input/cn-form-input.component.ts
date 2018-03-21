import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-form-input',
  templateUrl: './cn-form-input.component.html',
})
export class CnFormInputComponent implements OnInit {
    @Input() config;
    @Input() formGroup;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
