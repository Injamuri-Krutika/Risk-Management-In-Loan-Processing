import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { Customer } from "../Classes";

@Component({
  selector: "app-customers-dashboard",
  templateUrl: "./customers-dashboard.component.html",
  styleUrls: ["./customers-dashboard.component.css"]
})
export class CustomersDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Customer Details", cols: 1, rows: 1 },
          { title: "Loan Details", cols: 1, rows: 1 }
        ];
      }

      return [
        { title: "Customer Details", cols: 2, rows: 1 },
        { title: "Loan Details", cols: 2, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
  customerDetails: Customer;
  loan: Customer[];
  ngOnInit() {
    this.customerDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    this.loan = [this.customerDetails];
    console.log(this.customerDetails);
  }
}
