import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root',
})
export class EventServicesService {
  private urlEndPoint = 'http://localhost:8085/api/events';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private eventsSubject = new BehaviorSubject<Event[]>([]);

  events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadEvents();
  }

  private loadEvents(): void {
    this.getEvents().subscribe((events) => this.eventsSubject.next(events));
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.urlEndPoint);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.urlEndPoint}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http
      .post<Event>(this.urlEndPoint, event, { headers: this.httpHeaders })
      .pipe(
        tap((newEvent) => {
          const currentEvents = this.eventsSubject.value;
          this.eventsSubject.next([...currentEvents, newEvent]);
        })
      );
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http
      .put<Event>(`${this.urlEndPoint}/${event.idEvent}`, event, {
        headers: this.httpHeaders,
      })
      .pipe(
        tap((updatedEvent) => {
          const currentEvents = this.eventsSubject.value;
          const updatedEvents = currentEvents.map((e) =>
            e.idEvent === updatedEvent.idEvent ? updatedEvent : e
          );
          this.eventsSubject.next(updatedEvents);
        })
      );
  }

  deleteEvent(idEvent: number): Observable<void> {
    return this.http
      .delete<void>(`${this.urlEndPoint}/${idEvent}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        tap(() => {
          const currentEvents = this.eventsSubject.value;
          const filteredEvents = currentEvents.filter(
            (e) => e.idEvent !== idEvent
          );
          this.eventsSubject.next(filteredEvents);
        })
      );
  }

  refreshEvents(): void {
    this.loadEvents();
  }
}
