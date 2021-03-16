import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TemplateModule} from "./template/template.module";
import {HomeComponent} from './home/home.component';
import {CustomersModule} from "./customers/customers.module";
import {CustomersService} from "./customers.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProvidedServiceModule} from "./provided-service/provided-service.module";
import {ProvidedServiceService} from "./provided-service.service";
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {LayoutComponent} from './layout/layout.component';
import {AuthService} from "./auth.service";
import {TokenInterceptor} from "./token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    CustomersModule,
    ProvidedServiceModule
  ],
  providers: [
    CustomersService,
    ProvidedServiceService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
