import { ButtonCreateEventComponent } from '../../../elements/button-create-event/button-create-event.component';
import { Component, OnInit } from '@angular/core';
import { EventServicesService } from '../../../core/services/event-services.service';
import { Router } from '@angular/router';
import { Event } from '../../../core/models/event';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    CommonModule,
    ButtonCreateEventComponent,
  ],
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css',
})
export class ListEventComponent implements OnInit {
  public events: Event[] = [];

  constructor(
    private objEventService: EventServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.objEventService
      .getEvents()
      .subscribe((events) => (this.events = events));
    console.log(this.events);
  }

  deleteEvent(event: Event) {
    Swal.fire({
      title: 'Vas a eliminar el evento\n¿Estás seguro?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.objEventService.deleteEvent(event.idEvent).subscribe({
          next: (response) => {
            Swal.fire('¡Evento eliminado con éxito!', '', 'success');
            this.getEvents();
          },
          error: (error) => {
            Swal.fire(error.mensaje + '\nError: ' + error.error, '', 'error');
          },
        });
      }
    });
  }

  goToEditEvent(event: Event) {
    this.router.navigate(['events/edit', event.idEvent]);
  }
}
