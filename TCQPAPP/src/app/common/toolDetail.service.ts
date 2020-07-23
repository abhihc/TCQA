import { ToolDetail } from "./toolDetail.model";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ToolDetailService {
  selectedTool = new ToolDetail();
  Tools: ToolDetail[];
  baseURL = "http://localhost:3000/tools";

  constructor(private http: HttpClient) { }

  // Save Tool information
  postToolDetail(t: ToolDetail) {
    return this.http.post(this.baseURL, t);
  }

  // Get Tool information
  getToolDetailList() {
    return this.http.get(this.baseURL);
  }

  // Update Tool information
  putToolDetail(t: ToolDetail, id: string) {
    return this.http.put(this.baseURL + `/${id}`, t);
  }

  // Delete Tool information
  deleteToolDetail(id: string) {
    return this.http.delete(this.baseURL + `/${id}`);
  }
}
