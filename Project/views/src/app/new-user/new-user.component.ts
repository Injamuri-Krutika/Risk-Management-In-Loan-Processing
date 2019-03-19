import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
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
import { KnowEligibilityService } from "../know-eligibility.service";
import { EligibilityDetails } from "src/EligibilityDetails";
import { EmploymentType } from "../Interfaces";
import { ErrorStateMatcher, MatStepper, MatDialog } from "@angular/material";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { IneligibleDialogueComponent } from "../ineligible-dialogue/ineligible-dialogue.component";
import { stringify } from "@angular/core/src/render3/util";
import { AGE_TENURE } from "src/ageTenure";
import { LoanParameters } from "../Classes";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: "app-new-user",
  templateUrl: "./new-user.component.html",
  styleUrls: ["./new-user.component.css"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class NewUserComponent implements OnInit {
  @ViewChild("stepper") stepper: MatStepper;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loanParameters: LoanParameters;
  matcher = new MyErrorStateMatcher();
  employmentTypes: EmploymentType[] = [
    { value: 1, viewValue: "Salaried" },
    { value: 2, viewValue: "Self - Employment" }
  ];
  yesNo: string[] = ["Yes", "No"];

  constructor(
    private eligibilityService: KnowEligibilityService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loanParameters = new LoanParameters();
    this.firstFormGroup = this.fb.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/)
        ])
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[A-Za-z]+$/)
        ])
      ],
      // age: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(1),
      //     Validators.maxLength(2)
      //   ])
      // ],
      employmentType: ["", Validators.required],
      dob: ["", Validators.required],

      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
        ])
      ],
      phoneNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10)
        ])
      ]
    });
    this.secondFormGroup = this.fb.group({
      salariedForm: this.fb.group({
        experienceDetails: this.fb.group(
          {
            overallExp: ["", Validators.required],
            currentCompanyExp: ["", Validators.required]
          },
          {
            validators: NewUserComponent.currExpValidation
          }
        ),
        incomeDetails: this.fb.group(
          {
            incomePerMmonth: ["", Validators.required],
            emiPerMonth: [""]
          },
          {
            validators: NewUserComponent.incomeEmiValidation
          }
        )
      }),

      selfEmploymentForm: this.fb.group({
        experience: ["", Validators.required],
        incomePerAnnum: ["", Validators.required],
        emiPerMonth: [""],
        residenceOwned: ["", Validators.required],
        officeOwned: ["", Validators.required]
      })
    });
  }

  static currExpValidation(formGroup: FormGroup): any {
    let overallExp = parseInt(formGroup.controls["overallExp"].value);
    let currentCompanyExp = parseInt(
      formGroup.controls["currentCompanyExp"].value
    );
    if (overallExp >= currentCompanyExp) {
      return null;
    }
    return { valid: false };
  }

  static incomeEmiValidation(formGroup: FormGroup): any {
    let incomePerMmonth = parseInt(formGroup.controls["incomePerMmonth"].value);
    let emiPerMonth = parseInt(formGroup.controls["emiPerMonth"].value);
    if (isNaN(emiPerMonth)) {
      return null;
    } else {
      if (incomePerMmonth >= emiPerMonth) {
        return null;
      }
      return { valid: false };
    }
  }
  getErrorMessage(fieldName) {
    if (fieldName === "firstName") {
      return this.firstFormGroup.get("firstName").hasError("required")
        ? "First Name is mandatory"
        : this.firstFormGroup.get("firstName").hasError("pattern")
        ? "Not a valid First Name"
        : "";
    }
    if (fieldName === "lastName") {
      return this.firstFormGroup.get("lastName").hasError("required")
        ? "Last Name is mandatory"
        : this.firstFormGroup.get("lastName").hasError("pattern")
        ? "Not a valid Last Name"
        : "";
    }

    if (fieldName === "phoneNumber") {
      return this.firstFormGroup.get("phoneNumber").hasError("required")
        ? "Phone Number is mandatory"
        : this.firstFormGroup.get("phoneNumber").hasError("minlength")
        ? "Not a valid phone number"
        : "";
    }

    if (fieldName === "dob") {
      return this.firstFormGroup.get("dob").hasError("required")
        ? "Date of Birth is mandatory"
        : "";
    }

    if (fieldName === "email") {
      return this.firstFormGroup.get("email").hasError("required")
        ? "Email is mandatory"
        : this.firstFormGroup.get("email").hasError("pattern")
        ? "Not a valid email id"
        : "";
    }
    // if (fieldName === "age") {
    //   return this.firstFormGroup.get("age").hasError("required")
    //     ? "Age is mandatory"
    //     : this.firstFormGroup.get("age").value == 0
    //     ? "Dude!! Are u not born yet?"
    //     : this.firstFormGroup.get("age").hasError("minlength")
    //     ? "Not a valid Age"
    //     : "";
    // }
    if (fieldName === "employmentType") {
      return this.firstFormGroup.get("employmentType").hasError("required")
        ? "Employment Type is mandatory"
        : "";
    }

    if (fieldName === "overallExp") {
      return this.secondFormGroup
        .get("salariedForm")
        .get("experienceDetails")
        .get("overallExp")
        .hasError("required")
        ? "Overall Experience is mandatory"
        : "";
    }
    if (fieldName === "currentCompanyExp") {
      return this.secondFormGroup
        .get("salariedForm")
        .get("experienceDetails")
        .get("currentCompanyExp")
        .hasError("required")
        ? "Current Company Experience is mandatory"
        : "";
    }
    if (fieldName === "emiPerMonth") {
      return this.secondFormGroup
        .get("salariedForm")
        .get("incomeDetails")
        .get("emiPerMonth")
        .hasError("required")
        ? "EMI per month is mandatory"
        : "";
    }

    if (fieldName === "incomePerMmonth") {
      return this.secondFormGroup
        .get("salariedForm")
        .get("incomeDetails")
        .get("incomePerMmonth")
        .hasError("required")
        ? "Income per month is mandatory"
        : "";
    }
    if (fieldName === "experienceDetails") {
      return "Overall Experience should be greater than current experience!";
    }
    if (fieldName === "incomeDetails") {
      return "Income per month should be greater than EMI per month!";
    }
  }

  eligibilityDetails: EligibilityDetails;
  onSubmitFirstForm() {
    var id = this.firstFormGroup.get("employmentType").value;
    var age = this.calculateAge(this.firstFormGroup.get("dob").value);
    var firstName = this.firstFormGroup.get("firstName").value;
    var lastName = this.firstFormGroup.get("lastName").value;

    this.eligibilityService
      .getEligibilityDetails(id, age)
      .subscribe(details => {
        this.eligibilityDetails = details;
        if (this.eligibilityDetails)
          if (this.eligibilityDetails.isInEligible) {
            this.openDialog(
              firstName,
              lastName,
              "Sorry! You are ineligible to apply for loan.",
              1
            );
          } else {
            this.stepper.next();
          }
      });
  }

  onSubmitSecondForm(formNumber) {
    var firstName = this.firstFormGroup.get("firstName").value;
    var lastName = this.firstFormGroup.get("lastName").value;
    if (formNumber == 1) {
      var overallExp = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("experienceDetails")
          .get("overallExp").value
      );
      var currentCompanyExp = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("experienceDetails")
          .get("currentCompanyExp").value
      );
      var emiPerMonth = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("incomeDetails")
          .get("emiPerMonth").value
      );

      var incomePerMmonth = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("incomeDetails")
          .get("incomePerMmonth").value
      );
      var reason;
      var isInEligible = true;
      if (this.eligibilityDetails.minExperience > overallExp) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum OVERALL WORK EXPERIENCE bounds.";
      } else if (
        this.eligibilityDetails.minCurrentCompanyExperience > currentCompanyExp
      ) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the CURRENT COMPANY EXPERIENCE bounds.";
      } else if (this.eligibilityDetails.minIncome > incomePerMmonth) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum INCOME PER MOMNTH bounds.";
      } else if (
        this.eligibilityDetails.netTakeHome >
        incomePerMmonth - emiPerMonth
      ) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum NET TAKE HOME bounds.";
      } else {
        isInEligible = false;
      }

      if (isInEligible) {
        this.openDialog(firstName, lastName, reason, formNumber);
      } else {
        this.claculateLoanParameters(formNumber);
        this.stepper.next();
      }
    } else {
      var experience = parseInt(
        this.secondFormGroup.get("selfEmploymentForm").get("experience").value
      );
      var incomePerAnnum = parseInt(
        this.secondFormGroup.get("selfEmploymentForm").get("incomePerAnnum")
          .value
      );
      var emiPerMonth = parseInt(
        this.secondFormGroup.get("selfEmploymentForm").get("emiPerMonth").value
      );

      var residenceOwned = this.secondFormGroup
        .get("selfEmploymentForm")
        .get("residenceOwned").value;

      var officeOwned = this.secondFormGroup
        .get("selfEmploymentForm")
        .get("officeOwned").value;

      var reason;
      var isInEligible = true;
      if (this.eligibilityDetails.minExperience > experience) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum WORK EXPERIENCE bounds.";
      } else if (this.eligibilityDetails.minIncome > incomePerAnnum) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum INCOME PER ANNUM bounds.";
      } else if (
        this.eligibilityDetails.netTakeHome >
        incomePerAnnum / 12 - emiPerMonth
      ) {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not cross the minimum NET TAKE HOME bounds.";
      } else if (residenceOwned === "No" && officeOwned === "No") {
        reason =
          "Sorry! You are ineligible to apply for loan because you do not have OWN PROPERTY.";
      } else {
        isInEligible = false;
      }

      if (isInEligible) {
        this.openDialog(firstName, lastName, reason, formNumber);
      } else {
        this.claculateLoanParameters(formNumber);
        this.stepper.next();
      }
    }
  }

  openDialog(firstName, lastName, reason, formNumber): void {
    const dialogRef = this.dialog.open(IneligibleDialogueComponent, {
      width: "500px",
      data: { firstName: firstName, lastName: lastName, reason: reason }
    });
    if (formNumber == 1) {
      dialogRef.afterClosed().subscribe(result => {
        this.firstFormGroup.reset();
      });
    } else if (formNumber == 2) {
    }
    dialogRef.afterClosed().subscribe(result => {
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.stepper.selectedIndex = 0;
    });
  }

  claculateLoanParameters(formNumber) {
    var age = this.calculateAge(this.firstFormGroup.get("dob").value);
    var roi = 8.65;
    var ageTenure = AGE_TENURE;
    var lastAge;

    var emiPerMonth, incomePerMmonth, loanAmount, tenure;
    if (formNumber == 1) {
      emiPerMonth = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("incomeDetails")
          .get("emiPerMonth").value
      );
      incomePerMmonth = parseInt(
        this.secondFormGroup
          .get("salariedForm")
          .get("incomeDetails")
          .get("incomePerMmonth").value
      );
    } else {
      emiPerMonth = parseInt(
        this.secondFormGroup.get("selfEmploymentForm").get("emiPerMonth").value
      );
      incomePerMmonth =
        parseInt(
          this.secondFormGroup.get("selfEmploymentForm").get("incomePerAnnum")
            .value
        ) / 12;
    }
    if (isNaN(emiPerMonth)) loanAmount = incomePerMmonth * 60;
    else loanAmount = (incomePerMmonth - emiPerMonth) * 60;

    for (var key in ageTenure) {
      if (ageTenure.hasOwnProperty(key)) {
        if (parseInt(key) > age) {
          tenure = ageTenure[key][formNumber - 1];
          break;
        }
        lastAge = key;
      }
    }
    if (!tenure) {
      tenure = ageTenure[lastAge][formNumber - 1];
    }

    var n = 12;
    var r = roi / (n * 100);
    var year = tenure;
    var A =
      (Math.pow(1 + r, n * year) * loanAmount * r) /
      Math.pow(1 + r, n * year - 1);
    var emi = A.toFixed(2);

    //[P x R x (1+R)^N]/[(1+R)^ (N-1)],
    // var emi =
    //   (loanAmount * roiPerMonth * Math.pow(1 + roi, tenureInMonths)) /
    //   Math.pow(1 + roiPerMonth, tenureInMonths - 1);

    this.loanParameters.tenure = tenure;
    this.loanParameters.roi = roi;
    this.loanParameters.emi = parseInt(emi);
    this.loanParameters.loanAmount = loanAmount;
  }

  calculateAge(dob) {
    var ageDifMs = Date.now() - new Date(dob).getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    console.log(Math.abs(ageDate.getUTCFullYear() - 1970));
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
