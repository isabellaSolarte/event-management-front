import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EventServicesService } from './event-services.service';
import { Event } from '../models/event';

describe('EventServicesService', () => {
  let service: EventServicesService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8085/api/events';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventServicesService],
    });
    service = TestBed.inject(EventServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de eventos', () => {
    const mockEvents: Event[] = [
      { idEvent: 1, titleEvent: 'Evento 1', descriptionEvent: 'Desc 1', dateEvent: new Date(), locationEvent: 'Lugar 1' },
      { idEvent: 2, titleEvent: 'Evento 2', descriptionEvent: 'Desc 2', dateEvent: new Date(), locationEvent: 'Lugar 2' },
    ];

    service.getEvents().subscribe((events) => {
      expect(events.length).toBe(2);
      expect(events).toEqual(mockEvents);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvents);
  });

  it('debería obtener un evento por ID', () => {
    const mockEvent: Event = { idEvent: 1, titleEvent: 'Evento 1', descriptionEvent: 'Desc 1', dateEvent: new Date(), locationEvent: 'Lugar 1' };

    service.getEventById(1).subscribe((event) => {
      expect(event).toEqual(mockEvent);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEvent);
  });

  it('debería crear un evento', () => {
    const newEvent: Event = { idEvent: 3, titleEvent: 'Evento 3', descriptionEvent: 'Desc 3', dateEvent: new Date(), locationEvent: 'Lugar 3' };

    service.createEvent(newEvent).subscribe((event) => {
      expect(event).toEqual(newEvent);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newEvent);
  });

  it('debería actualizar un evento', () => {
    const updatedEvent: Event = { idEvent: 1, titleEvent: 'Evento Actualizado', descriptionEvent: 'Desc Actualizado', dateEvent: new Date(), locationEvent: 'Lugar Actualizado' };

    service.updateEvent(updatedEvent).subscribe((event) => {
      expect(event).toEqual(updatedEvent);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedEvent);
  });

  it('debería eliminar un evento', () => {
    service.deleteEvent(1).subscribe((response) => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
