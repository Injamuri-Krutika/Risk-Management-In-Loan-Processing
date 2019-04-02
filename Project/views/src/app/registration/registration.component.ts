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

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  constructor(
    private registerService: RegisterService,
    private route: ActivatedRoute,
    private router: Router
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
    ])
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.custDetails.password = this.profileForm
      .get("pass")
      .get("password").value;
    console.log(this.custDetails);
    this.registerService.registeration(this.custDetails).subscribe(status => {
      if (status === "Saved") {
        console.log(status);
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
}
