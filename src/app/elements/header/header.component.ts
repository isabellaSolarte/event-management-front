import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, ChipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuItems = [
    { label: 'Inicio', icon: 'pi pi-home' },
    { label: 'Eventos', icon: 'pi pi-calendar' },
  ];

  constructor(private AuthService: AuthService, private router: Router) {}

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/login']);
  }
}
