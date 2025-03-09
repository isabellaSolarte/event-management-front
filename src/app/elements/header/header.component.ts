import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar'; 
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule,ButtonModule,ChipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Eventos', icon: 'pi pi-calendar', routerLink: '/events' },
    { label: 'Contacto', icon: 'pi pi-envelope', routerLink: '/contact' },
  ];
}
