import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRequest } from '../../core/models/loginRequest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequest = { name: '', password: '' };
  returnUrl: string = '/events';
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] || '/events';
    });

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return !!(
      formControl &&
      formControl.invalid &&
      (formControl.dirty || formControl.touched)
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginRequest = this.loginForm.value;
      this.authService.login(this.loginRequest).subscribe({
        next: (response) => {
          Swal.fire('¡Bienvenido!', '', 'success');
          this.router.navigate(['/events/list']);
        },
        error: (error) => {
          Swal.fire(
            '¡Error!\n No se pudo loguear. Error: ' + error.error,
            '',
            'error'
          );
          console.error('Error en login', error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
