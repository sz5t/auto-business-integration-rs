import {Component, Input, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'cn-grid-input',
  templateUrl: './cn-grid-input.component.html',
})
export class CnGridInputComponent implements OnInit {
<<<<<<< HEAD
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

=======
  @Input() config;
  constructor(
      private http: _HttpClient
  ) { }

  ngOnInit() {
  }
>>>>>>> 66f869312b7013bb3912407dd3e8dd797b942f29
}
