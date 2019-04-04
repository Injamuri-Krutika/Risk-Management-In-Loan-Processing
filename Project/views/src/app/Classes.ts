export class Customer {
  firstName: string;
  lastName: string;
  dob: string;
  employerType: string;
  income: BigInteger;
  email: string;
  employmentType: string;
  phoneNumber: number;
  emiPerMonth: number;
  overallExp: string;
  currentCompanyExp: string;
  incomePerMonth: string;
  incomePerAnnum: string;
  residenceOwned: string;
  officeOwned: string;
  aadhar: Blob;
  pan: Blob;
  bankStatements: Blob;
  residenceProof: Blob;
  propertyProof: Blob;
  password: string;
  eligibleLoanAmount: number;
  tenure: number;
  roi: number;
  loanEMI: number;
  loanStatus: string;
  requestDate: string;
}

export class CustomerFiles {
  aadhar: Blob;
  pan: Blob;
  bankStatements: Blob;
  residenceProof: Blob;
  propertyProof: Blob;
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
export class FileParameters {
  fileName: string;
  type: string;
  value: string | any;
}

export class LoginResponse {
  status: string;
  customerDetails: object;
}
