import { Injectable } from "@angular/core";
import { AGE_TENURE } from "./ageTenure";
import { CalculateAgeService } from "./calculate-age.service";
import { LoanParameters } from "./Classes";

@Injectable({
  providedIn: "root"
})
export class CalculateLoanParametersService {
  constructor(private calcAgeService: CalculateAgeService) {}
  claculateLoanParameters(formNumber, formGroup, age) {
    var loanParameters = new LoanParameters();
    console.log(formGroup);
    var age = age;
    var roi = 8.65;
    var ageTenure = AGE_TENURE;
    var lastAge;

    var emiPerMonth, incomePerMmonth, loanAmount, tenure;
    if (formNumber == 1) {
      emiPerMonth = parseInt(
        formGroup.value["salariedForm"]["incomeDetails"]["emiPerMonth"]
      );
      incomePerMmonth = parseInt(
        formGroup.value["salariedForm"]["incomeDetails"]["incomePerMmonth"]
      );
    } else {
      emiPerMonth = parseInt(
        formGroup.value["selfEmploymentForm"]["emiPerMonth"]
      );
      incomePerMmonth =
        parseInt(formGroup.value["selfEmploymentForm"]["incomePerAnnum"]) / 12;
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

    loanParameters.tenure = tenure;
    loanParameters.roi = roi;
    loanParameters.emi = this.calculateEMI(roi, tenure, loanAmount);
    loanParameters.loanAmount = loanAmount;
    return loanParameters;
  }

  calculateEMI(roi, tenure, loanAmount) {
    var n = 12;
    var r = roi / (n * 100);
    var year = tenure;
    console.log(tenure);
    console.log(
      Math.pow(1 + r, n * year) * loanAmount * r,
      (Math.pow(1 + r, n * year) - 1)
    );
    var A =
      (Math.pow(1 + r, n * year) * loanAmount * r) /
      (Math.pow(1 + r, n * year) - 1);
    console.log(A);
    var emi = A.toFixed(2);
    return parseInt(emi);
  }
}
