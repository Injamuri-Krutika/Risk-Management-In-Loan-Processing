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
      user: new FormControl("", [
        Validators.required,
        Validators.pattern(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
      ]),
      password: new FormControl("", [Validators.required])
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.profileForm.value);
    this.loginService
      .verifyCredentials(this.profileForm.value)
      .subscribe(status => {
        console.log(status);
        if (status === "Success") {
          this.router.navigate([
            `/dashboard/${this.profileForm.get("user").value}`
          ]);
        } else if (status === "customer-dashboard") {
          this.router.navigate(["/customer-dashboard"]);
        } else if (status === "Unverified") {
          this.message = "Please verify your account";
        } else if (status === "Invalid") {
          this.message = "Re-register your account";
        } else {
          this.message = "Invalid credentials";
        }
      });
  }
}
