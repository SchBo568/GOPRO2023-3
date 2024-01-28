import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateUserDto } from '../app/models/UpdateUserDto';
import { ResponseStatus } from '../app/models/ResponseStatus';
import { UserSession } from '../app/models/UserSession';
import { CreateUserDto } from '../app/models/CreateUser';
import { CreateToolDto } from '../app/models/CreateTool';
import { GetToolDto } from '../app/models/GetTool';
import { UpdateToolDto } from '../app/models/UpdateTool';
import { GetKiosks } from '../app/models/GetKiosks';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private apiUrl = 'http://64.226.82.238:3000/tools';   private token = ''; 

  public setToken(token: string):void {
    this.token = token
  }

  constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  createTool(tool: CreateToolDto): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}`, tool, { headers });
  }

  getTools(): Observable<GetToolDto[]> {
    return this.http.get<any>(`${this.apiUrl}`)
  }

  getToolsByOwner(username: string): Observable<GetToolDto[]> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/owner/${username}`, {headers})
  }

  async getToolsByKiosk(kioskId: number): Promise<Observable<GetKiosks[]>> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/kiosk/${kioskId}`, { headers });
  }

  async getToolById(toolId: number): Promise<Observable<GetToolDto>> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/${toolId}`, {headers})
  }

  editToolById(id: number, tool: UpdateToolDto ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, tool, {headers})
  }

  editToolByIdStatus(id: number, tool: CreateToolDto ): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/status/${id}`, tool, {headers})
  }

  deleteToolById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {headers})
  }





}
