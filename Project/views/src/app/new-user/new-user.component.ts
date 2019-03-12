import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder
} from "@angular/forms";
import { KnowEligibilityService } from "../know-eligibility.service";
import { EligibilityDetails } from "src/EligibilityDetaiils";
import { EmploymentType } from "../EmploymentType";
import { ErrorStateMatcher } from "@angular/material";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.css"]
})
export class NewUserComponent implements OnInit {
  constructor(
    private router: Router,
    private eligibilityService: KnowEligibilityService,
    private fb: FormBuilder
  ) {}
  ngOnInit() {}

  matcher = new MyErrorStateMatcher();
  employmentTypes: EmploymentType[] = [
    { value: "salaried", viewValue: "Salaried" },
    { value: "selfEmployment", viewValue: "Self - Employment" }
  ];
  basicInfoForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: [
      "",
      // Validators.compose([
      Validators.required
      // Validators.pattern(/[^a-zA-Z ]+/)
      // ])
    ],
    age: [
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(2)
      ])
    ],
    employmentType: ["", Validators.required]
  });

  eligibilityDetails: EligibilityDetails;
  onSubmit() {
    console.log("Inside on submit");
    this.eligibilityService.getEligibilityDetails().subscribe(details => {
      this.eligibilityDetails = details;
      console.log(this.eligibilityDetails);
      console.log(this.eligibilityDetails);
      this.basicInfoForm.get("firstName").valid;
    });

    // this.router.navigate(["/income-emi"]);
  }

  getErrorMessage(fieldName) {
    if (fieldName === "firstName") {
      return this.basicInfoForm.get("firstName").hasError("required")
        ? "First Name is mandatory"
        : this.basicInfoForm.get("firstName").hasError("pattern")
        ? "Not a valid First Name"
        : "";
    }
    if (fieldName === "lastName") {
      return this.basicInfoForm.get("firstName").hasError("required")
        ? "Last Name is mandatory"
        : this.basicInfoForm.get("firstName").hasError("pattern")
        ? "Not a valid Last Name"
        : "";
    }
    if (fieldName === "age") {
      return this.basicInfoForm.get("firstName").hasError("required")
        ? "Age is mandatory"
        : this.basicInfoForm.get("firstName").hasError("pattern")
        ? "Not a valid Age"
        : "";
    }
    if (fieldName === "employmentType") {
      return this.basicInfoForm.get("employmentType").hasError("required")
        ? "Employment Type is mandatory"
        : "";
    }
  }
}
