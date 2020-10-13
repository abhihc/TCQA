import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { QualityPlan } from "./quality-plan.model";

@Injectable()
export class QualityPlanService {
  selectedQualityPlan = new QualityPlan();
  qualityPlans: QualityPlan[];
  readonly baseURL = "http://localhost:3000/qualityPlans";

  constructor(private http: HttpClient) { }

  // Save Quality Plan
  postQualityPlan(qp: QualityPlan) {
    return this.http.post(this.baseURL, qp);
  }

  // Get Quality Plans list
  getQualityPlanList() {
    return this.http.get(this.baseURL);
  }

  // Update Quality Plan
  putQualityPlan(qp: QualityPlan) {
    return this.http.put(this.baseURL + `/${qp._id}`, qp);
  }

  // Delete Quality Plan
  deleteQualityPlan(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
