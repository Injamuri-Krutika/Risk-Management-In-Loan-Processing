import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./app-material/app-material.module";
import { FileSelectDirective, FileDropDirective } from "ng2-file-upload";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { BasicComponent } from "./basic/basic.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { IncomeEmiComponent } from "./income-emi/income-emi.component";
import { NumberOnlyDirective } from "./number-only.directive";
import { IneligibleDialogueComponent } from "./ineligible-dialogue/ineligible-dialogue.component";
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AfterRegistrationComponent } from './after-registration/after-registration.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomersDashboardComponent } from './customers-dashboard/customers-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { CreditApproverDashboardComponent } from './credit-approver-dashboard/credit-approver-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    BasicComponent,
    IncomeEmiComponent,
    NumberOnlyDirective,
    IneligibleDialogueComponent,
    UploadDocumentsComponent,
    FileSelectDirective,
    LoginComponent,
    RegistrationComponent,
    AfterRegistrationComponent,
    CustomerDashboardComponent,
    CustomersDashboardComponent,
    CreditApproverDashboardComponent
  ],
  entryComponents: [IneligibleDialogueComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
