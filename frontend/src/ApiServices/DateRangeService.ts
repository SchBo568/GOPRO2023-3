import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateDateRangeDto } from '../app/models/CreateDateRange';


@Injectable({
  providedIn: 'root'
})
export class DateRangeService {
  private apiUrl = 'http://64.226.82.238:3000/date-ranges';
  private token = '';

  public setToken(token: string):void {
    this.token = token
  }

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  createDateRange(dateRange: CreateDateRangeDto) : Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`, dateRange, {headers});
  }

  getDateRangesByToolId(toolId: number): Observable<CreateDateRangeDto[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${toolId}`, {headers})
  }

  deleteDateRangeById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers})
  }

  async deleteDateRangesById(id: number): Promise<Observable<any>> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/tool/${id}`, {headers})
  }

}
