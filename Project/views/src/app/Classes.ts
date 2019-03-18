export class Customer {
  firstName: string;
  lastName: string;
  age: number;
  employerType: string;
  income: BigInteger;
  emailId: string;
  phoneNumber: number;
  emiPerMonth: number;
}

export class IneligibilityInformation {
  formNumber: number;
  firstName: string;
  lastName: string;
  reason: string;
}

export class LoanParameters {
  loanAmount: number;
  tenure: number;
  roi: number;
  emi: number;
}
