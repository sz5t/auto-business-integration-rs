import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type,
  ViewContainerRef
} from '@angular/core';
import {
  NzCheckboxComponent,
  NzCheckboxGroupComponent,
  NzDatePickerComponent, NzInputComponent, NzRadioComponent, NzRangePickerComponent, NzSelectComponent,
  NzTimePickerComponent
} from "ng-zorro-antd";
import {CnGridInputComponent} from "@shared/components/cn-grid-input/cn-grid-input.component";
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
@Directive({
  selector: '[CnGridEditorDirective]'
})
export class GridEditorDirective implements OnInit, OnChanges{
  @Input() config;
  component: ComponentRef<any>;
  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) { }
  ngOnChanges() {
    if(this.component) {
      this.component.instance.config = this.config;
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
  }
}
