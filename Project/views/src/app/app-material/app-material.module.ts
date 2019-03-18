import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatStepperModule,
  MatIconModule,
  MatDialogModule,
  MatRadioModule,
  MatGridListModule,
  MatTableModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatOptionModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatGridListModule,
    MatTableModule
  ]
})
export class AppMaterialModule {}
