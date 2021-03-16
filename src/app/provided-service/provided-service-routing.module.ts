import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProvidedServiceFormComponent} from "./provided-service-form/provided-service-form.component";
import {ProvidedServiceListComponent} from "./provided-service-list/provided-service-list.component";
import {LayoutComponent} from "../layout/layout.component";
import {AuthGuard} from "../auth.guard";

const routes: Routes = [
  {path: 'provided-services', component: LayoutComponent, canActivate: [AuthGuard], children: [
  { path: 'form', component: ProvidedServiceFormComponent},
  { path: 'list', component: ProvidedServiceListComponent},
  {path: '', redirectTo : '/provided-services/list', pathMatch: 'full'},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvidedServiceRoutingModule { }
