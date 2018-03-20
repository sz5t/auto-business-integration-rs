import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {RoleManagerComponent} from './role-manager/role-manager.component';
import {ModuleManagerComponent} from './module-manager/module-manager.component';
import {BaseManagerComponent} from './base-manager/base-manager.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: 'base-manager', component: BaseManagerComponent},
    {path: 'module-manager', component: ModuleManagerComponent},
    {path: 'role-manager', component: RoleManagerComponent},
    {path: 'system-manager', component: UserManagerComponent}
];
const COMPONENT_NOROUNT = [
    UserManagerComponent,
    RoleManagerComponent,
    ModuleManagerComponent,
    BaseManagerComponent
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule,
        BaseManagerComponent
    ],
    declarations: [
        ...COMPONENT_NOROUNT
    ],
    entryComponents: COMPONENT_NOROUNT
})
export class SystemModule {
}
