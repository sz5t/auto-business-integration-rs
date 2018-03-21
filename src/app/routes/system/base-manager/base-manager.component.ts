import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-base-manager, [base-manager]',
  templateUrl: './base-manager.component.html',
})
export class BaseManagerComponent implements OnInit {

    _cnRowCfg = {
        nzGutter: 8,
        nzType: '',
        nzAlign: '',
        nzJustify: ''
    };
    _cnColCfg = {
        nzSpan: 0,
        nzOrder: 0,
        nzOffset: 0,
        nzPush: 0,
        nzPull: 0,
        nzXs: 24,
        nzSm: 24,
        nzMd: 24,
        nzLg: 24,
        ngXl: 24
    };

    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
