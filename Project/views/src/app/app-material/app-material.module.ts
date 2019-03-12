import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatInputModule, MatButtonModule, MatCardModule,MatSelectModule,MatOptionModule } from "@angular/material";

@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, MatCardModule,MatSelectModule,MatOptionModule],
  exports: [MatInputModule, MatButtonModule, MatCardModule,MatSelectModule,MatOptionModule]
})
export class AppMaterialModule {}
