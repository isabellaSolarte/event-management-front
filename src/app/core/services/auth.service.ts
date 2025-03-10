import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlEndPoint = 'http://localhost:8085/api/auth';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && localStorage !== undefined;
    } catch (e) {
      return false;
    }
  }

  isAuthenticated(): boolean {
    if (!this.isLocalStorageAvailable()) {
      return false;
    }
    return localStorage.getItem('token') !== null;
  }

  login(loginRequest: LoginRequest): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.urlEndPoint}/login`, loginRequest)
      .pipe(
        tap((response) => {
          if (response.token && this.isLocalStorageAvailable()) {
            localStorage.setItem('token', response.token);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlEndPoint}/register`, user).pipe(
      tap((response) => {
        console.log('Usuario registrado:', response);
      })
    );
  }

  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
    }
  }
}
