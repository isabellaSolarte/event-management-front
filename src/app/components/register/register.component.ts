import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name() {
    return this.registerForm.get('name')!;
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser: User = {
        id: 0,
        name: this.registerForm.value.name,
        password: this.registerForm.value.password,
      };

      console.log('Datos enviados:', newUser);

      this.authService.register(newUser).subscribe(
        (response) => {
          Swal.fire('¡Usuario registrado con éxito!', '', 'success');
          console.log('Usuario registrado:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          Swal.fire('Error al registrar usuario', '', 'error');
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }
}
