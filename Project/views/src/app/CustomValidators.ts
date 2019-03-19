import { FormGroup } from "@angular/forms";

export class CustomValidators {
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
}
