import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    profession: '',
    birthDate: '',
  };

  successMessage = '';
  errorMessage = '';
  user: any = null;
  showModal = false;

  showConfirmationModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private authService: Auth, private router: Router) {}

  register() {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      profession,
      birthDate,
    } = this.registerForm;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phone ||
      !profession ||
      !birthDate
    ) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.authService
      .register({
        firstName,
        lastName,
        email,
        password,
        phone,
        profession,
        birthDate,
      })
      .subscribe({
        next: (res) => {
          this.successMessage =
            res.message || '¡Registro exitoso! Verifica tu correo.';
          this.errorMessage = '';
          this.showConfirmationModal();

          this.registerForm = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: '',
            profession: '',
            birthDate: '',
          };
        },

        error: (err) => {
          this.successMessage = '';
          this.errorMessage = err.error.message || 'Error en el registro';
        },
      });
  }
}
