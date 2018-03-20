import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-cn-grid-select',
  templateUrl: './cn-grid-select.component.html',
})
export class CnGridSelectComponent implements OnInit {
  @Input() config;
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
  }

}
