import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 



import { QualityPlan } from './quality-plan.model';


@Injectable()
export class QualityPlanService {
  selectedQualityPlan = new QualityPlan();
  qualityPlans: QualityPlan[];
  readonly baseURL = 'http://localhost:3000/qualityPlans';

  constructor(private http : HttpClient) { }

  postQualityPlan(qp : QualityPlan){
    console.log(qp)
    return this.http.post(this.baseURL, qp);
  }

  getQualityPlanList(){
    return this.http.get(this.baseURL);
  }

  putQualityPlan(qp : QualityPlan){
    return this.http.put(this.baseURL + `/${qp._id}`, qp);
  }

  deleteQualityPlan(_id: string){
    return this.http.delete(this.baseURL + `/${_id}` );
  }

}
