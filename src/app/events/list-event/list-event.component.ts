import { Component, OnInit } from '@angular/core';
import { EventServicesService } from '../../core/services/event-services.service';
import { Router } from '@angular/router';
import { Event } from '../../core/models/event';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-event',
  standalone: true,
  imports: [TableModule,ButtonModule,CommonModule],
  templateUrl: './list-event.component.html',
  styleUrl: './list-event.component.css'
})
export class ListEventComponent implements OnInit{
  public events: Event[] = [];
  constructor(private objEventService:EventServicesService,private router:Router) { 
  }
  ngOnInit(): void {
    this.getEvents();
  }
  getEvents(){
    this.objEventService.getEvents().subscribe(

      events => this.events = events
    );
    console.log(this.events);
  }
}
