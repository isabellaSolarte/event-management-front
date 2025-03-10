import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-create-event',
  standalone: true,
  imports: [],
  templateUrl: './button-create-event.component.html',
  styleUrl: './button-create-event.component.css',
})
export class ButtonCreateEventComponent {
  constructor(private router: Router) {}

  goToCreateEvent(): void {
    console.log('Go to create modal...');
    this.router.navigate(['/events/create']);
  }
}
