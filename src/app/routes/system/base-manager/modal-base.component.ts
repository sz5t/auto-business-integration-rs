import {Component, OnInit, Input} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
import {NzModalSubject} from 'ng-zorro-antd';
import {CacheService} from '@delon/cache';


@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html'
})
export class ModalBaseComponent implements OnInit{


  validateForm: FormGroup;
    _name: any;
    _parentId: string;
    _tree: any;
    _ids: any[];
    values: any[] ;

  @Input()
  set name(value: any) {
    this._name = value;
  }

  constructor(
    private http: _HttpClient,
    private subject: NzModalSubject,
    private cacheService: CacheService,
    private fb: FormBuilder
  ) {
    this.subject.on('onDestory' ,() => {

    })
  }
  emitDataOutside() {
    if(!this.validateForm.valid)
      return;
    console.log(this.values);
    const data = {
      Children: null,
      ConfigData :  JSON.stringify({
        group: this.validateForm.controls['Group'].value ? this.validateForm.controls['Group'].value : false,
        link: this.validateForm.controls['Link'].value,
        icon: this.validateForm.controls['Icon'].value,
        ids : this._ids
      }),
      Name:   this.validateForm.controls['Name'].value,
      Order:  this.validateForm.controls['Order'].value,
      ParentId:  this._parentId,
      Remark: this.validateForm.controls['Remark'].value,
      ShareScope: 'Project'
    };
    this.subject.next(data);
    this.handleCancel('');
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }


  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
    }
  }

    ngOnInit() {
      this.validateForm = this.fb.group({
        Name     : [ null, [ Validators.required ] ],
        ParentId : [ null],
        Group    : [ null],
        Link     : [ null],
        Icon     : [ ],
        Remark   : [ null],
        Order    : [null, [ Validators.min(0)]],
      });
        this._tree = this.cacheService.getNone('ModuleTree');
        if(this._name !== '') {
          this.validateForm.controls['Name'].setValue(this._name.Name);
          this.validateForm.controls['Group'].setValue(JSON.parse(this._name.ConfigData).group);
          this.validateForm.controls['Link'].setValue(JSON.parse(this._name.ConfigData).link);
          this.validateForm.controls['Icon'].setValue(JSON.parse(this._name.ConfigData).icon);
          this.validateForm.controls['Order'].setValue(this._name.Order);
          this.validateForm.controls['Remark'].setValue(this._name.Remark);
          this.values = JSON.parse(this._name.ConfigData).ids;
        }
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  public onChanges(values: any)
  {
    this._parentId = values.pop();
    console.log(this._parentId);
  }

  public onSelectionChange(options: any)
  {
    this._ids = [];
    options.forEach( item => {
      this._ids.push({
        label: item.label,
        value: item.value
      })
      console.log(this._ids);
    })
  }


}
