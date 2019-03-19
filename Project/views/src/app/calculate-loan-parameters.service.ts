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

    loanParameters.tenure = tenure;
    loanParameters.roi = roi;
    loanParameters.emi = parseInt(emi);
    loanParameters.loanAmount = loanAmount;
    return loanParameters;
  }
}
