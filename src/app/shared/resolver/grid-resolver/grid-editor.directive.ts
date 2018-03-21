import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type,
  ViewContainerRef,
  forwardRef,
  Output,
  EventEmitter
} from '@angular/core';
import {
  NzCheckboxComponent,
  NzCheckboxGroupComponent,
  NzDatePickerComponent, NzInputComponent, NzRadioComponent, NzRangePickerComponent, NzSelectComponent,
  NzTimePickerComponent
} from "ng-zorro-antd";
import {CnGridInputComponent} from "@shared/components/cn-grid-input/cn-grid-input.component";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const components: {[type: string]: Type<any>} = {
  input: CnGridInputComponent,
  select: NzSelectComponent,
  datePicker: NzDatePickerComponent,
  timePicker: NzTimePickerComponent,
  rangePicker: NzRangePickerComponent,
  checkbox: NzCheckboxComponent,
  checkboxGroup: NzCheckboxGroupComponent,
  radioGroup: NzRadioComponent
};
export const EXE_COUNTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GridEditorDirective),
  multi: true
};
@Directive({
  selector: '[CnGridEditorDirective]',
  providers: [EXE_COUNTER_VALUE_ACCESSOR]
})
export class GridEditorDirective implements OnInit, OnChanges,ControlValueAccessor{
  propagateChange = (_: any) => {
    console.log('变化');
  };
  onChange = (_: any) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    if(obj){
      this.value= obj;
      this.component.instance.setValue(this.value);
    }
    console.log('writeValue',obj);
  }
  registerOnChange(fn: any): void {
  
    this.propagateChange = fn;//每次控件view层的值发生改变，都要调用该方法通知外部
    console.log('registerOnChange');
  }
  registerOnTouched(fn: any): void {
    console.log('registerOnTouched');
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('setDisabledState');
  }
  @Input() config;
  @Input()  value;
  @Output() updateValue =new EventEmitter();
  component: ComponentRef<any>;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
  ngOnChanges() {
    if(this.component) {
      this.component.instance.config = this.config;
      this.component.instance.value=this.value;
    }
  }
  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `不支持此类型的组件 (${this.config.type}).可支持的类型为: ${supportedTypes}`
      );
    }
    const comp = this.resolver.resolveComponentFactory<any>(components[this.config.type]);
    this.component = this.container.createComponent(comp);
    this.component.instance.config = this.config;
    this.component.instance.setValue(this.value);
    this.component.instance.updateValue.subscribe(event => {
      this.setValue(event)
    });
   
  }

  getValue(){
    return  this.value;
  }

  //组件将值写回
  setValue(data?){
   console.log('resolverupdateValue触发',data);
   this.value=data;
   this.updateValue.emit(data);
   console.log('resolverupdateValue触发后',data);
  }
}


