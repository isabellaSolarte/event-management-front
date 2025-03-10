import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EventServicesService } from '../../../core/services/event-services.service';
import Swal from 'sweetalert2';
import { Event } from '../../../core/models/event';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    MessageModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private objEventService: EventServicesService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newEvent: Event = {
        idEvent: 0,
        titleEvent: this.registerForm.value.name,
        descriptionEvent: this.registerForm.value.description,
        dateEvent: new Date(this.registerForm.value.date),
        locationEvent: this.registerForm.value.location || '',
      };

      this.objEventService.createEvent(newEvent).subscribe({
        next: (createdEvent) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Evento creado con éxito',
            showConfirmButton: false,
            timer: 2500,
          });
          this.resetForm();
          this.goBack();
        },
        error: (error) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error al guardar el evento \n' + 'Error: ' + error,
            showConfirmButton: false,
            timer: 1500,
          });
          console.error('Error creating event:', error);
        },
      });
    }
  }

  resetForm(): void {
    this.registerForm.reset({
      date: this.formatDateForInput(new Date()),
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
