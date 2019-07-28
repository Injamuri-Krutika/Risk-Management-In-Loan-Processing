import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors
} from "@angular/forms";
import { RegisterService } from "../register.service";
import { DISABLED } from "@angular/forms/src/model";
import { CalculateLoanParametersService } from "../calculate-loan-parameters.service";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private calcLoanParamsService: CalculateLoanParametersService
  ) {}
  custDetails = JSON.parse(sessionStorage.getItem("customerDetails"));

  ngOnInit() {}
  confirmPasswordValidator: ValidatorFn = (
    control: FormGroup
  ): ValidationErrors | null => {
    const passowrdValue = control.get("password").value;
    const confirmValue = control.get("confirm").value;
    return passowrdValue === confirmValue ? null : { confirmPassword: true };
  };

  profileForm = new FormGroup({
    user: new FormControl({
      value: this.custDetails.email,
      disabled: true
    }),
    pass: new FormGroup(
      {
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(
            "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}"
          )
        ]),
        confirm: new FormControl("", [Validators.required])
      },
      { validators: this.confirmPasswordValidator }
    ),
    loanAmount: new FormControl(this.custDetails.eligibleLoanAmount, [
      Validators.required,
      Validators.max(this.custDetails.eligibleLoanAmount)
    ]),
    updatedTenure: new FormControl(
      { value: this.custDetails.tenure, disabled: false },
      [Validators.required, Validators.max(this.custDetails.tenure)]
    ),
    updatedEMI: new FormControl({
      value: this.custDetails.loanEMI,
      disabled: true
    })
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.custDetails.password = this.profileForm
      .get("pass")
      .get("password").value;
    this.custDetails.loanStatus = "Requested";
    this.custDetails.finalLoanAmount = this.profileForm.get("loanAmount").value;
    this.custDetails.requestId = "RQT-" + this.generate();
    console.log(JSON.stringify(this.custDetails));
    // this.custDetails.finalTenure = this.profileForm.get("updatedTenure");
    this.custDetails.finalEMI = this.profileForm.get("updatedEMI").value;
    console.log(this.custDetails);
    this.registerService.registeration(this.custDetails).subscribe(status => {
      if (status === "Saved") {
        console.log(status);
        var i = sessionStorage.length;
        while (i--) {
          var key = sessionStorage.key(i);
          sessionStorage.removeItem(key);
        }
        this.router.navigate(["/success-registeration"]);
      }
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  updateEMI() {
    console.log(this.profileForm.get("updatedTenure").valid)
    console.log(this.profileForm.get("loanAmount").valid)

    if (
      this.profileForm.get("updatedTenure").valid &&
      this.profileForm.get("loanAmount").valid
    ) {
      console.log(this.profileForm.get("updatedTenure").value);
      var emi = this.calcLoanParamsService.calculateEMI(
        8.65,
        parseInt(this.profileForm.get("updatedTenure").value),
        parseInt(this.profileForm.get("loanAmount").value)
      );
      this.profileForm.get("updatedEMI").setValue(emi);
    }
  }

  length = 8;
  timestamp = +new Date();

  _getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  generate = function() {
    var ts = this.timestamp.toString();
    var parts = ts.split("").reverse();
    var id = "";

    for (var i = 0; i < this.length; ++i) {
      var index = this._getRandomInt(0, parts.length - 1);
      id += parts[index];
    }

    return id;
  };
}
