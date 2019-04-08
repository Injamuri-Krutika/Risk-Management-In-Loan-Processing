import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Customer, EligibilityDetails, AppliedLoans } from "./Classes";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoanDetailsService {
  getLoansUrl = "http://localhost:8000/loan-details/get";
  updateLoansUrl = "http://localhost:8000/loan-details/update";

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "my-auth-token",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Origin": "*"
    }),
    params: {}
  };
  /** GET Applied loan Details from the server */
  getAppliedLoans(): Observable<AppliedLoans> {
    return this.http.get<AppliedLoans>(this.getLoansUrl, this.httpOptions).pipe(
      tap(_ => console.log("fetched Applied Loan Details")),
      catchError(this.handleError<AppliedLoans>("getAppliedLoans"))
    );
  }

  updateAppliedLoan(params): Observable<any> {
    return this.http
      .put<any>(this.updateLoansUrl, params, this.httpOptions)
      .pipe(
        tap(_ => console.log("Updated Applied Loan Details")),
        catchError(this.handleError<any>("updateAppliedLoan"))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
