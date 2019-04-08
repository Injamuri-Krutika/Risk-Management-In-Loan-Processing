import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EligibilityDetails } from "./Classes";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

// import { Http, Headers, ResponseContentType } from "@angular/http";

@Injectable()
export class FilesUploadService {
  constructor(private http: HttpClient) {}
  uploadFilesUrl: string = "";

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

  downloadPDF(filename, filetype): any {
    return this.http.get("http://127.0.0.1:3000/file/" + filename, {
      responseType: "blob"
    });
  }

  showFileNames() {
    return this.http.get("http://127.0.0.1:3000/files");
  }

  uploadPDF(files) {
    return this.http
      .post(this.uploadFilesUrl, files, this.httpOptions)
      .pipe(catchError(this.handleError("fileUpload", files)));
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
