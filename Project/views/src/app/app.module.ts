import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { BasicComponent } from "./basic/basic.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { IncomeEmiComponent } from "./income-emi/income-emi.component";
import { NumberOnlyDirective } from './number-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    BasicComponent,
    IncomeEmiComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
