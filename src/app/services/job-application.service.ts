import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JobApplication } from '../model/JobApplication';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private apiUrl = "http://localhost:8080/applications";

  constructor(private http: HttpClient) { }

  getAllJobApplications() {
    return this.http.get<any>(this.apiUrl + "/all");
  }

  deleteJobApplications(jobNumber: Number) {
    return this.http.delete(this.apiUrl + "/" + jobNumber)
  }

  addJobApplication(jobApp: JobApplication) {
    //console.log('jobApp' + jobApp);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(jobApp);
    //console.log('body' + body);
    return this.http.post<JobApplication>(this.apiUrl, body, { 'headers': headers });
  }
}
