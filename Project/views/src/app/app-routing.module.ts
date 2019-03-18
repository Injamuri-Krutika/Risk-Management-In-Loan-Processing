import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicComponent } from "./basic/basic.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { IncomeEmiComponent } from "./income-emi/income-emi.component";
import { UploadDocumentsComponent } from "./upload-documents/upload-documents.component";

const routes: Routes = [
  { path: "", redirectTo: "/basic", pathMatch: "full" },
  { path: "basic", component: BasicComponent },
  { path: "new-user", component: NewUserComponent },
  { path: "income-emi", component: IncomeEmiComponent },
  { path: "upload-documents", component: UploadDocumentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
