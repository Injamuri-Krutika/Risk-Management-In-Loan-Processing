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
  MatTableModule,
  MatExpansionModule,
  MatProgressBarModule,
  MatListModule
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
    MatTableModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatListModule
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
    MatTableModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatListModule
  ]
})
export class AppMaterialModule {}
