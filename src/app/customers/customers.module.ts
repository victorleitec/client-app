import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerFormComponent } from './customers-form/customers-form.component';
import {FormsModule} from "@angular/forms";
import { CustomersListComponent } from './customers-list/customers-list.component';


@NgModule({
  declarations: [CustomerFormComponent, CustomersListComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule
  ], exports: [CustomerFormComponent, CustomersListComponent]
})
export class CustomersModule { }
