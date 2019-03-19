import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NewUserErrorMessagesService {
  constructor() {}

  getErrorMessage(fieldName, field) {
    if (fieldName === "firstName") {
      return field.hasError("required")
        ? "First Name is mandatory"
        : field.hasError("pattern")
        ? "Not a valid First Name"
        : "";
    }
    if (fieldName === "lastName") {
      return field.hasError("required")
        ? "Last Name is mandatory"
        : field.hasError("pattern")
        ? "Not a valid Last Name"
        : "";
    }

    if (fieldName === "phoneNumber") {
      return field.hasError("required")
        ? "Phone Number is mandatory"
        : field.hasError("minlength")
        ? "Not a valid phone number"
        : "";
    }

    if (fieldName === "dob") {
      return field.hasError("required") ? "Date of Birth is mandatory" : "";
    }

    if (fieldName === "email") {
      return field.hasError("required")
        ? "Email is mandatory"
        : field.hasError("pattern")
        ? "Not a valid email id"
        : "";
    }

    if (fieldName === "employmentType") {
      return field.hasError("required") ? "Employment Type is mandatory" : "";
    }

    if (fieldName === "overallExp") {
      return field.hasError("required")
        ? "Overall Experience is mandatory"
        : "";
    }
    if (fieldName === "currentCompanyExp") {
      return field.hasError("required")
        ? "Current Company Experience is mandatory"
        : "";
    }
    if (fieldName === "emiPerMonth") {
      return field.hasError("required") ? "EMI per month is mandatory" : "";
    }

    if (fieldName === "incomePerMmonth") {
      return field.hasError("required") ? "Income per month is mandatory" : "";
    }
    if (fieldName === "experienceDetails") {
      return "Overall Experience should be greater than current experience!";
    }
    if (fieldName === "incomeDetails") {
      return "Income per month should be greater than EMI per month!";
    }
  }
}
