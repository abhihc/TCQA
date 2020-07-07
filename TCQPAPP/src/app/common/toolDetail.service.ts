import { ToolDetail } from './toolDetail.model';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ToolDetailService {
  selectedTool = new ToolDetail();
  Tools: ToolDetail[];
  baseURL = 'http://localhost:3000/tools';

  constructor(private http: HttpClient) { }

  postToolDetail(t: ToolDetail) {
    console.log(t)
    return this.http.post(this.baseURL, t);
  }

  getToolDetailList() {
   return this.http.get(this.baseURL);
  }

  putToolDetail(t: ToolDetail) {
    return this.http.put(this.baseURL + `/${t._id}`, t);
  }

  deleteToolDetail(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}