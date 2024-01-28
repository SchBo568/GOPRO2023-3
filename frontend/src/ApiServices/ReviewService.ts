import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserDto } from '../app/models/UpdateUserDto';
import { ResponseStatus } from '../app/models/ResponseStatus';
import { UserSession } from '../app/models/UserSession';
import { GetKiosks } from '../app/models/GetKiosks';
import { GetReview } from '../app/models/GetReview';
import { CreateReview } from '../app/models/CreateReview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://64.226.82.238:3000/reviews';

  constructor(private http: HttpClient) {}

  getReviewByToolId(toolId: number): Observable<GetReview[]> {
    return this.http.get<any>(`${this.apiUrl}/tool/${toolId}`, {});
  }

  createReview(review: CreateReview): any {
    return this.http.post<any>(`${this.apiUrl}/tool`, review)
  }

}