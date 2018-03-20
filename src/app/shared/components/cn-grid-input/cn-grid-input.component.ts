import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-grid-input',
  templateUrl: './cn-grid-input.component.html',
})
export class CnGridInputComponent implements OnInit {
    @Input() config;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
