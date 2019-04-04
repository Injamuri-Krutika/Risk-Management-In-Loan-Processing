import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginService } from "../login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  message = "";
  profileForm: FormGroup;
  ngOnInit() {
    this.profileForm = new FormGroup({
      user: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);

    if (this.profileForm.get("user").value.includes("Credit")) {
      this.router.navigate(["/credit-approver-dashboard"]);
      return;
    }
    this.loginService
      .verifyCredentials(this.profileForm.value)
      .subscribe(res => {
        console.log(res);
        if (res) {
          if (res.status === "dashboard") {
            sessionStorage.setItem(
              "userDetails",
              JSON.stringify(res.customerDetails)
            );
            this.router.navigate(["/customer-dashboard"]);
          } else if (res.status === "Unverified") {
            this.message = "Please verify your account";
          } else if (res.status === "Invalid") {
            this.message = "Re-register your account";
          } else {
            this.message = "Invalid credentials";
          }
        }
      });
  }
}
