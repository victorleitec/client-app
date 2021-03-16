import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProvidedServiceRoutingModule} from './provided-service-routing.module';
import {ProvidedServiceFormComponent} from './provided-service-form/provided-service-form.component';
import {ProvidedServiceListComponent} from './provided-service-list/provided-service-list.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ProvidedServiceFormComponent,
    ProvidedServiceListComponent
  ], imports: [
    CommonModule,
    ProvidedServiceRoutingModule,
    FormsModule,
    RouterModule
  ], exports: [
    ProvidedServiceFormComponent,
    ProvidedServiceListComponent
  ]
})
export class ProvidedServiceModule {
}
