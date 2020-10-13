import { Result } from "./result";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUri = "http://localhost:3000/qualityPlanResults";
  headers = new HttpHeaders().set("Content-Type", "application/json");
  results: Result[];

  constructor(private http: HttpClient) { }

  // Create
  addResults(data): Observable<any> {
    const url = `${this.baseUri}/add-result`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Get all Quality Plan assessment results
  getResults() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get all Quality Plans
  getQualityPlans() {
    const url = `${this.baseUri}/list-quality-plans`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get all Quality Plans assessment results
  getQualityPlanResults(qualityPlanName) {
    const url = `${this.baseUri}/quality-plan-results?qualityPlan=${qualityPlanName}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Get quality plan assessment result
  getResult(id): Observable<any> {
    const url = `${this.baseUri}/result/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }

  // Delete quality plan assessment result
  deleteResult(id): Observable<any> {
    const url = `${this.baseUri}/delete-result/${id}`;
    return this.http
      .delete(url, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
