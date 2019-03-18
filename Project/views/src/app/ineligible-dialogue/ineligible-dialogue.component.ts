import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { IneligibilityInformation } from "../Classes";

@Component({
  selector: "app-ineligible-dialogue",
  templateUrl: "./ineligible-dialogue.component.html",
  styleUrls: ["./ineligible-dialogue.component.css"]
})
export class IneligibleDialogueComponent {
  constructor(
    public dialogRef: MatDialogRef<IneligibleDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IneligibilityInformation
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
