import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { UploadDocumentService } from "./../upload-document.service";
import { MatButtonModule, MatDialog } from "@angular/material";
import { FileParameters, Customer, CustomerFiles } from "../Classes";
import { IneligibleDialogueComponent } from "../ineligible-dialogue/ineligible-dialogue.component";
import { Router } from "@angular/router";
import { FileUploader, FileSelectDirective } from "ng2-file-upload";
import { FilesUploadService } from "../files-upload.service";
import { saveAs } from "file-saver";

const uri = "http://localhost:8000/file/upload";

@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html",
  styleUrls: ["./upload-documents.component.css"]
})
export class UploadDocumentsComponent implements OnInit {
  @ViewChild("file") file;
  addFiles() {
    this.file.nativeElement.click();
  }

  uploader: FileUploader = new FileUploader({ url: uri, headers: [] });

  attachmentList: any = [];
  constructor(
    private _fileService: FilesUploadService,
    private router: Router
  ) {
    console.log(this.uploader);
    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };

    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append(
        "email",
        // "Hi@gmail.com"
        JSON.parse(sessionStorage.getItem("customerDetails")).email
      );
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      console.log(response);
      this.attachmentList.push(JSON.parse(response));
    };
  }

  submitFiles() {
    setTimeout(() => {
      var custDetails = JSON.parse(sessionStorage.getItem("customerDetails"));
      console.log(this.attachmentList);
      custDetails.attachmentList = this.attachmentList;
      sessionStorage.setItem("customerDetails", JSON.stringify(custDetails));
      this.router.navigate(["/register"]);
    }, 2000);
  }

  ngOnInit() {}
}
