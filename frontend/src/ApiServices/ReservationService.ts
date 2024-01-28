import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserDto } from '../app/models/UpdateUserDto';
import { ResponseStatus } from '../app/models/ResponseStatus';
import { UserSession } from '../app/models/UserSession';
import { CreateUserDto } from '../app/models/CreateUser';
import { CreateToolDto } from '../app/models/CreateTool';
import { GetToolDto } from '../app/models/GetTool';
import { CreateReservationDto } from '../app/models/CreateReservation';
import { GetReservationDto } from '../app/models/GetReservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://64.226.82.238:3000/reservations';   private token = ''; 

  public setToken(token: string):void {
    this.token = token
    console.log("Token in Api: "+ this.token)
  }

  constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  createReservation(reservation: CreateReservationDto): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`, reservation, { headers });
  }

  getReservationsByToolId(toolId: number): Observable<CreateReservationDto []> {
    const headers = this.getHeaders();
    console.log(`${this.apiUrl}/tool/${toolId}`);
    
    this.http.post<any>(`${this.apiUrl}/tool/${toolId}`, { headers })
      .subscribe(
        data => console.log(data), // This will log the actual result
        error => console.log(error) // This will log any error that occurs
      );
    
    return this.http.post<any>(`${this.apiUrl}/tool/${toolId}`, { headers });
  }

  getReservationsByUsername(username: string): Observable<CreateReservationDto []> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/user/${username}`, { headers });
  }

  getReservationsNotPaid(): Observable<GetReservationDto []> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/notPaid`, {headers})
  }

  deleteReservationById(id: number, username: string, toolId: number): Observable<string> {
      const headers = this.getHeaders();
      return this.http.delete<any>(`${this.apiUrl}/${id}/${username}/${toolId}`, { headers })
  }

  updateReservationById(id: number, username: string, toolId: number, reservation: CreateReservationDto): Observable<CreateReservationDto> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}/${username}/${toolId}`, reservation, {headers})
  }
}