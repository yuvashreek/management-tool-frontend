import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {

  private apiUrl = "http://localhost:8080/applications";

  constructor(private http: HttpClient) { }

  getAllJobApplications() {
    return this.http.get<any>(this.apiUrl + "/all");
  }
}
