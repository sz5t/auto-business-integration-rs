import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-cn-grid-select',
  templateUrl: './cn-grid-select.component.html',
})
export class CnGridSelectComponent implements OnInit {
  @Input() config;
  @Output() updateValue =new EventEmitter();
  @Input()  value;
  //_selectedMultipleOption:any[];
  constructor(
      private http: _HttpClient
  ) { }
  _selectedMultipleOption; 
  
  ngOnInit() {
     if(this.config){ 
       if(this.value){
         let selected;
         this.config.options.forEach(element => {
           if(element.value===this.value){
            selected=element;
           }
         }); 
         this._selectedMultipleOption =  selected;
       }
     }
  }

  userNameChange(name?){
    console.log('select值发生变化',name);
    if(name){
      this.updateValue.emit(name.value);
    }
    else{
      this.updateValue.emit(null);
    }

 }

}
