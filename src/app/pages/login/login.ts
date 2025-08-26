import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http
      .post<any>('http://localhost:9090/user/login', this.loginData)
      .subscribe({
        next: (response) => {
          // Guardar datos del usuario en localStorage si quieres
          localStorage.setItem('loggedUser', JSON.stringify(response));
          // Redirigir al dashboard
          this.router.navigate(['/dashboard/profile']);
        },
        error: (error) => {
          // Mostrar mensaje de error si las credenciales son incorrectas
          this.errorMessage = error.error.error || 'Error al iniciar sesión';
        },
      });
  }
}
