import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Customer, EligibilityDetails } from "./Classes";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class KnowEligibilityService {
  eligibilityUrl = "http://localhost:8000/know-eligibility/get";

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
  /** GET Eligibility Details from the server */
  getEligibilityDetails(
    id: number,
    age: number
  ): Observable<EligibilityDetails> {
    // let params = new HttpParams();
    // params = params.append("id", id + "");
    // this.httpOptions.params = params;
    return this.http
      .get<EligibilityDetails>(
        this.eligibilityUrl + "/" + id + "/" + age,
        this.httpOptions
      )
      .pipe(
        tap(_ => console.log("fetched Eligibility Details")),
        catchError(
          this.handleError<EligibilityDetails>("getEligibilityDetails")
        )
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
