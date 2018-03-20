import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'role-manager',
  templateUrl: './role-manager.component.html',
})
export class RoleManagerComponent implements OnInit {
    @Input() config;
    constructor(
        private http: _HttpClient
    ) { }

    ngOnInit() {
    }

}
