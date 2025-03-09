import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventServicesService {
  private urlEndPoint = 'http://localhost:8085/api/events';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http:HttpClient) { }
  getEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.urlEndPoint);
  }
}
