import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicComponent } from "./basic/basic.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { IncomeEmiComponent } from "./income-emi/income-emi.component";
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { AfterRegistrationComponent } from "./after-registration/after-registration.component";
import { CustomersDashboardComponent } from "./customers-dashboard/customers-dashboard.component";
import { CreditApproverDashboardComponent } from "./credit-approver-dashboard/credit-approver-dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/upload-documents", pathMatch: "full" },
  { path: "basic", component: BasicComponent },
  { path: "new-user", component: NewUserComponent },
  { path: "income-emi", component: IncomeEmiComponent },
  { path: "upload-documents", component: UploadDocumentsComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "success-registeration", component: AfterRegistrationComponent },
  { path: "customer-dashboard", component: CustomersDashboardComponent },
  {
    path: "credit-approver-dashboard",
    component: CreditApproverDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
