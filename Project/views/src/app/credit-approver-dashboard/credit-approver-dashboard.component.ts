import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { CreditApprover, Customer } from "../Classes";
import { LoanDetailsService } from "../loan-details.service";
import { stringify } from "@angular/core/src/render3/util";
import { FilesUploadService } from "../files-upload.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-credit-approver-dashboard",
  templateUrl: "./credit-approver-dashboard.component.html",
  styleUrls: ["./credit-approver-dashboard.component.css"]
})
export class CreditApproverDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Card 1", cols: 1, rows: 1 },
          { title: "Card 2", cols: 1, rows: 1 },
          { title: "Card 3", cols: 1, rows: 1 },
          { title: "Card 4", cols: 1, rows: 1 }
        ];
      }

      return [
        { title: "Card 1", cols: 2, rows: 1 },
        { title: "Card 2", cols: 1, rows: 1 },
        { title: "Card 3", cols: 1, rows: 2 },
        { title: "Card 4", cols: 1, rows: 1 }
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private loanDetails: LoanDetailsService,
    private fileService: FilesUploadService
  ) {}
  panelOpenState: boolean = true;
  creditApprover: CreditApprover;
  appliedLoans: Customer[];
  displayedColumns: string[];
  viewDetails: Customer;
  attachmentList: any = [];

  ngOnInit() {
    this.creditApprover = JSON.parse(sessionStorage.getItem("creditApprover"));
    this.loanDetails.getAppliedLoans().subscribe(res => {
      this.appliedLoans = res.loans;
    });
    this.displayedColumns = [
      "requestId",
      "requestDate",
      "firstName",
      "lastName",
      "finalLoanAmount",
      "tenure",
      "finalEMI"
    ];
  }
  verifyDetails(index) {
    this.panelOpenState = false;
    this.viewDetails = this.appliedLoans[index];
    this.attachmentList = this.viewDetails.attachmentList;
  }

  updateLoan(status, requestId, email) {
    var message;

    if (status === "Accepted") {
      message =
        "Hello,\n\n" +
        "Congratulations!! We are happy to inform you that your loan is ACCEPTED.";
    } else {
      message =
        "Hello,\n\n" + "We are sorry to inform you that your loan is REJECTED.";
    }

    var requestObject = {
      loanStatus: status,
      requestId,
      email,
      message
    };
    this.loanDetails.updateAppliedLoan(requestObject).subscribe(res => {
      console.log(res);
      if (res.nModified == 1 && res.n == 1) {
        this.loanDetails.getAppliedLoans().subscribe(res => {
          console.log("Hello buddy!");
          this.appliedLoans = res.loans;
          this.viewDetails = null;
          this.panelOpenState = true;
        });
      }
    });
  }
  download(index, email) {
    var filename = this.attachmentList[index].uploadname;

    this.fileService.downloadFile(filename, email).subscribe(data => {
      saveAs(data, filename), error => console.error(error);
      console.log("Hi46");
    });
  }

  downloadFileNow(data: any) {
    const blob = new Blob([data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
