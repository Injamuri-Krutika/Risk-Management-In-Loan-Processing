import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
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
import {MatButtonModule} from "@angular/material";
import { FileParameters } from "../Classes";
@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  @ViewChild('fileInput') fileInput: ElementRef;
  
  constructor(private fb: FormBuilder) {
    this.createForm();

  }
  
  ngOnInit() {
  //   var link = function (scope, element, attrs) {
  //     const input = element.find('#fileInput');
  //     const button = element.find('#uploadButton');
  
  //     if (input.length && button.length) {
  //         button.click((e) => input.click());
  //     }
  // }
  var str;
  }
  createForm() {
    this.form = this.fb.group({
      adhar: null
    });
  }
  onFileChange(event) {
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
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        
      
      reader.readAsDataURL(file);
          reader.onload = () => {
            this.form.get('adhar').setValue({
              filename: file.name,
              filetype: file.type,
              value: reader.result
            })
            //console.log(reader.result);
          //  console.log(this.form.get('adhar').value.filename); 
          };
         
         

        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** In A
         * ngular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
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
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }
 
  clearFileAdhar() {
    this.form.get('adhar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  clearFilePan() {
    this.form.get('pan').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  clearFileBankStmts() {
    this.form.get('bs').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  clearFileProofRes()
  {
    this.form.get('pr').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  clearFileProofPro()
  {
    this.form.get('pp').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
  clearFileID()
  {
    this.form.get('ip').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
 
}
  