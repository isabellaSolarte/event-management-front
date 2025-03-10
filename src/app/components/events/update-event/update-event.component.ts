import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventServicesService } from '../../../core/services/event-services.service';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';
import { Event } from '../../../core/models/event';
@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.css',
})
export class UpdateEventComponent implements OnInit {
  eventId: number = 0;
  updateEventForm!: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private objEventService: EventServicesService
  ) {
    this.updateEventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.eventId = +id;
        this.loadEvent(this.eventId);
      }
    });
  }

  onSubmit() {
    if (this.updateEventForm.valid) {
      const newEvent: Event = {
        idEvent: this.eventId,
        titleEvent: this.updateEventForm.value.name,
        descriptionEvent: this.updateEventForm.value.description,
        dateEvent: new Date(this.updateEventForm.value.date),
        locationEvent: this.updateEventForm.value.location || '',
      };

      this.objEventService.createEvent(newEvent).subscribe({
        next: (createdEvent) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Evento actualizado con éxito',
            showConfirmButton: false,
            timer: 1500,
          });
          this.goBack;
        },
        error: (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al actualizar el evento \n' + 'Error: ' + error,
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error creating event:', error);
        },
      });
    }
  }

  loadEvent(id: number): void {
    this.objEventService.getEventById(id).subscribe((event) => {
      this.updateEventForm.patchValue({
        name: event.titleEvent,
        description: event.descriptionEvent,
        date: this.formatDateForInput(new Date(event.dateEvent)),
        location: event.locationEvent,
      });
    });
  }

  formatDateForInput(date: Date): string {
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    );
    return localDate.toISOString().slice(0, 16);
  }

  goBack() {
    this.location.back();
  }
}
