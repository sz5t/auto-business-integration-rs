import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// delon
import { NgZorroAntdExtraModule } from 'ng-zorro-antd-extra';
import { AlainThemeModule } from '@delon/theme';
import { AlainACLModule } from '@delon/acl';
import { ZORROMODULES, ABCMODULES } from '../delon.module';

// region: third libs
import { CountdownModule } from 'ngx-countdown';
import { NzSchemaFormModule } from 'nz-schema-form';
import { ComponentResolverComponent } from './resolver/component-resolver/component-resolver.component';
import {LayoutResolverComponent} from "@shared/resolver/layout-resolver/layout-resolver.component";
import { FormResolverDirective } from './resolver/form-resolver/form-resolver.directive';
import { FormResolverComponent } from './resolver/form-resolver/form-resolver.component';
import { CnFormInputComponent } from './components/cn-form-input/cn-form-input.component';
import {
  NzCheckboxGroupComponent,
  NzDatePickerComponent, NzInputComponent, NzRadioGroupComponent, NzRangePickerComponent, NzSelectComponent,
  NzTimePickerComponent
} from "ng-zorro-antd";
import { CnFormSubmitComponent } from './components/cn-form-submit/cn-form-submit.component';
import { CnFormSelectComponent } from './components/cn-form-select/cn-form-select.component';
import { CnDatePickerComponent } from './components/cn-date-picker/cn-date-picker.component';
import { CnTimePickerComponent } from './components/cn-time-picker/cn-time-picker.component';
import { CnFormRangePickerComponent } from './components/cn-form-range-picker/cn-form-range-picker.component';
import { CnFormCheckboxComponent } from './components/cn-form-checkbox/cn-form-checkbox.component';
import { CnFormCheckboxGroupComponent } from './components/cn-form-checkbox-group/cn-form-checkbox-group.component';
import { CnFormRadioGroupComponent } from './components/cn-form-radio-group/cn-form-radio-group.component';
import { GridEditorDirective } from './resolver/grid-resolver/grid-editor.directive';
import { CnGridInputComponent } from './components/cn-grid-input/cn-grid-input.component';
import { CnGridSelectComponent } from './components/cn-grid-select/cn-grid-select.component';
import { CnGridDatePickerComponent } from './components/cn-grid-date-picker/cn-grid-date-picker.component';
import { CnGridTimePickerComponent } from './components/cn-grid-time-picker/cn-grid-time-picker.component';
import { CnGridRangePickerComponent } from './components/cn-grid-range-picker/cn-grid-range-picker.component';
import { CnGridCheckboxComponent } from './components/cn-grid-checkbox/cn-grid-checkbox.component';
import { BsnDataTableComponent } from './business/bsn-data-table/bsn-data-table.component';
import { CnContextMenuComponent } from './components/cn-context-menu/cn-context-menu.component';
const THIRDMODULES = [
    CountdownModule,
    NzSchemaFormModule
];
// endregion

// region: your modules & componets & directives
//const MODULES = [];
const COMPONENTS = [
  ComponentResolverComponent,
  LayoutResolverComponent,
  FormResolverComponent,
  CnFormInputComponent,
  CnFormSubmitComponent,
  CnFormSelectComponent,
  CnDatePickerComponent,
  CnTimePickerComponent,
  CnFormRangePickerComponent,
  CnFormCheckboxComponent,
  CnFormCheckboxGroupComponent,
  CnFormRadioGroupComponent,
  CnGridInputComponent,
  CnGridSelectComponent,
  CnGridDatePickerComponent,
  CnGridTimePickerComponent,
  CnGridRangePickerComponent,
  CnGridCheckboxComponent,
  BsnDataTableComponent,
  CnContextMenuComponent

];
const DIRECTIVES = [
  FormResolverDirective,
  GridEditorDirective
];
// endregion

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule.forChild(),
        ...ABCMODULES,
        AlainACLModule,
        // third libs
        ...THIRDMODULES
    ],
    declarations: [
        // your components
        ...COMPONENTS,
        ...DIRECTIVES,
        BsnDataTableComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...ZORROMODULES,
        NgZorroAntdExtraModule,
        AlainThemeModule,
        ...ABCMODULES,
        // third libs
        ...THIRDMODULES,
        // your components
        ...COMPONENTS,
        ...DIRECTIVES
    ],
    entryComponents:[
      CnFormInputComponent,
      CnFormSubmitComponent,
      CnFormSelectComponent,
      CnDatePickerComponent,
      CnTimePickerComponent,
      CnFormRangePickerComponent,
      CnFormCheckboxComponent,
      CnFormCheckboxGroupComponent,
      CnFormRadioGroupComponent,
      CnGridInputComponent,
      CnGridSelectComponent,
      NzInputComponent,
      NzSelectComponent,
      NzDatePickerComponent,
      NzTimePickerComponent,
      NzRangePickerComponent,
      NzRadioGroupComponent,
      NzCheckboxGroupComponent,
      BsnDataTableComponent
    ]
})
export class SharedModule { }
