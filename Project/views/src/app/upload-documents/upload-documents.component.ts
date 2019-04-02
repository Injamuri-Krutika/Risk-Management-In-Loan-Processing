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
@Component({
  selector: "app-upload-documents",
  templateUrl: "./upload-documents.component.html",
  styleUrls: ["./upload-documents.component.css"]
})
export class UploadDocumentsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild("fileInput") fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.form = this.fb.group({
      adhar: [null, Validators.required],
      pan: [null, Validators.required],
      bs: [null, Validators.required],
      pr: [null, Validators.required],
      pp: [null, Validators.required],
      ip: [null, Validators.required]
    });
  }
  onFileChange(event, filename) {
    // let reader = new FileReader();
    // if(event.target.files && event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.form.get('adhar').setValue({
    //       filename: file.name,
    //       filetype: file.type,
    //       value: reader.result[1]
    //     })
    //   };
    // }
    let fileList: FileList = event.target.files;
    let reader = new FileReader();
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();

      reader.readAsDataURL(file);
      reader.onload = () => {
        if (filename == "adhar")
          this.form.get("adhar").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        else if (filename == "pan") {
          this.form.get("pan").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        } else if (filename == "bs") {
          this.form.get("bs").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        } else if (filename == "pr") {
          this.form.get("pr").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        } else if (filename == "pp") {
          this.form.get("pp").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        } else if (filename == "ip") {
          this.form.get("ip").setValue({
            filename: file.name,
            filetype: file.type,
            value: reader.result
          });
        }
        //  console.log(this.form.get('adhar').value.filename);
      };

      formData.append("uploadFile", file, file.name);
      let headers = new Headers();
      /** In A
       * ngular 5, including the header Content-Type can invalidate your request */
      headers.append("Content-Type", "multipart/form-data");
      headers.append("Accept", "application/json");
      // let options = new RequestOptions({ headers: headers });
      // this.http.post(`${this.apiEndPoint}`, formData, options)
      //     .map(res => res.json())
      //     .catch(error => Observable.throw(error))
      //     .subscribe(
      //         data => console.log('success'),
      //         error => console.log(error)
      //     )
    }
  }
  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    console.log(formModel);
    //TODO OCR
    var custDetails = JSON.parse(sessionStorage.getItem("customerDetails"));
    var custFileDetails = new CustomerFiles();

    if (Math.floor(Math.random()) % 2 == 0) {
      custFileDetails.aadhar = formModel["adhar"];
      custFileDetails.pan = formModel["pan"];
      custFileDetails.aadhar = formModel["bs"];
      custFileDetails.residenceProof = formModel["pr"];
      custFileDetails.propertyProof = formModel["pp"];
      sessionStorage.setItem(
        "customerFileDetails",
        JSON.stringify(custFileDetails)
      );

      // In a real-world app you'd have a http request / service call here like
      // this.http.post('apiUrl', formModel)
      this.router.navigate(["/register"]);
    } else {
      this.openDialog(
        custDetails.firstName,
        custDetails.lastName,
        "Sorry!! Your documents are invalid, hence you are ineligible to apply for loan."
      );
    }
  }

  clearFileAdhar() {
    this.form.get("adhar").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }
  clearFilePan() {
    this.form.get("pan").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }
  clearFileBankStmts() {
    this.form.get("bs").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }
  clearFileProofRes() {
    this.form.get("pr").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }
  clearFileProofPro() {
    this.form.get("pp").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }
  clearFileID() {
    this.form.get("ip").setValue(null);
    // this.fileInput.nativeElement.value = "";
  }

  openDialog(firstName, lastName, reason): void {
    const dialogRef = this.dialog.open(IneligibleDialogueComponent, {
      width: "500px",
      data: { firstName: firstName, lastName: lastName, reason: reason }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/basic"]);
    });
  }
}
