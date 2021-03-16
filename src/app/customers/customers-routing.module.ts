import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerFormComponent} from "./customers-form/customers-form.component";
import {CustomersListComponent} from "./customers-list/customers-list.component";
import {LayoutComponent} from "../layout/layout.component";
import {AuthGuard} from "../auth.guard";

const routes: Routes = [
  {path: 'customers', component: LayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'form', component: CustomerFormComponent},
      {path: 'form/:id', component: CustomerFormComponent},
      {path: 'list', component: CustomersListComponent},
      {path: '', redirectTo : '/customers/list', pathMatch: 'full' }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule {
}
