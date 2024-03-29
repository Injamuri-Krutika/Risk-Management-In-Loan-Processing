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
import { EmploymentType } from "../Interfaces";
import { ErrorStateMatcher, MatStepper, MatDialog } from "@angular/material";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { IneligibleDialogueComponent } from "../ineligible-dialogue/ineligible-dialogue.component";
import { stringify } from "@angular/core/src/render3/util";
import { AGE_TENURE } from "src/app/ageTenure";
import { LoanParameters, Customer, EligibilityDetails } from "../Classes";
import { CustomErrorStateMatcher } from "../CustomErrorStateMatcher";
import { CustomValidators } from "../CustomValidators";
import { NewUserErrorMessagesService } from "../new-user-error-messages.service";
import { CalculateAgeService } from "../calculate-age.service";
import { CalculateLoanParametersService } from "../calculate-loan-parameters.service";

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
  matcher = new CustomErrorStateMatcher();
  employmentTypes: EmploymentType[] = [
    { value: 1, viewValue: "Salaried" },
    { value: 2, viewValue: "Self - Employment" }
  ];
  yesNo: string[] = ["Yes", "No"];

  constructor(
    private eligibilityService: KnowEligibilityService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public errorServerice: NewUserErrorMessagesService,
    private calcAgeService: CalculateAgeService,
    private calcLoanParams: CalculateLoanParametersService
  ) {}

  ngOnInit() {
    console.log(this.errorServerice);
    console.log(this.calcLoanParams);
    console.log(this.calcAgeService);

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
            validators: CustomValidators.currExpValidation
          }
        ),
        incomeDetails: this.fb.group(
          {
            incomePerMmonth: ["", Validators.required],
            emiPerMonth: [""]
          },
          {
            validators: CustomValidators.incomeEmiValidation
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

  eligibilityDetails: EligibilityDetails;
  onSubmitFirstForm() {
    var id = this.firstFormGroup.get("employmentType").value;
    var age = this.calcAgeService.calculateAge(
      this.firstFormGroup.get("dob").value
    );
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
        this.loanParameters = this.calcLoanParams.claculateLoanParameters(
          formNumber,
          this.secondFormGroup,
          this.calcAgeService.calculateAge(this.firstFormGroup.get("dob").value)
        );
        this.setSessionStorage(
          this.firstFormGroup,
          this.secondFormGroup,
          this.loanParameters
        );
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
      } else if (this.eligibilityDetails.minIncome > incomePerAnnum / 12) {
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
        this.loanParameters = this.calcLoanParams.claculateLoanParameters(
          formNumber,
          this.secondFormGroup,
          this.calcAgeService.calculateAge(this.firstFormGroup.get("dob").value)
        );
        this.setSessionStorage(
          this.firstFormGroup,
          this.secondFormGroup,
          this.loanParameters
        );
        this.stepper.next();
      }
    }
  }

  openDialog(firstName, lastName, reason, formNumber): void {
    const dialogRef = this.dialog.open(IneligibleDialogueComponent, {
      width: "500px",
      data: { firstName: firstName, lastName: lastName, reason: reason }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.firstFormGroup.reset();
      this.secondFormGroup.reset();
      this.stepper.selectedIndex = 0;
    });
  }

  setSessionStorage(
    firstFormGroup: FormGroup,
    secondFormGroup: FormGroup,
    loanParameters: LoanParameters
  ) {
    var customerDetails = new Customer();
    customerDetails.firstName = firstFormGroup.get("firstName").value;
    customerDetails.lastName = firstFormGroup.get("lastName").value;
    customerDetails.dob = firstFormGroup.get("dob").value;
    customerDetails.email = firstFormGroup.get("email").value;
    customerDetails.phoneNumber = firstFormGroup.get("phoneNumber").value;
    customerDetails.eligibleLoanAmount = loanParameters.loanAmount;
    customerDetails.tenure = loanParameters.tenure;
    customerDetails.roi = loanParameters.roi;
    customerDetails.loanEMI = loanParameters.emi;

    var employmentType = firstFormGroup.get("employmentType").value;
    customerDetails.employmentType =
      employmentType == 1 ? "Salaried" : "Self Employment";

    if (employmentType == 1) {
      customerDetails.overallExp = secondFormGroup
        .get("salariedForm")
        .get("experienceDetails")
        .get("overallExp").value;

      customerDetails.currentCompanyExp = secondFormGroup
        .get("salariedForm")
        .get("experienceDetails")
        .get("currentCompanyExp").value;

      customerDetails.incomePerMonth = secondFormGroup
        .get("salariedForm")
        .get("incomeDetails")
        .get("incomePerMmonth").value;

      customerDetails.emiPerMonth = secondFormGroup
        .get("salariedForm")
        .get("incomeDetails")
        .get("emiPerMonth").value;
    } else {
      customerDetails.overallExp = secondFormGroup
        .get("selfEmploymentForm")
        .get("experience").value;

      customerDetails.incomePerAnnum = secondFormGroup
        .get("selfEmploymentForm")
        .get("incomePerAnnum").value;

      customerDetails.emiPerMonth = secondFormGroup
        .get("selfEmploymentForm")
        .get("emiPerMonth").value;

      customerDetails.residenceOwned = secondFormGroup
        .get("selfEmploymentForm")
        .get("residenceOwned").value;
      customerDetails.officeOwned = secondFormGroup
        .get("selfEmploymentForm")
        .get("officeOwned").value;
    }
    console.log(customerDetails);
    sessionStorage.setItem("customerDetails", JSON.stringify(customerDetails));
    console.log(sessionStorage.getItem("customerDetails"));
  }
}
