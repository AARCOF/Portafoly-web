import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-confirm',
  imports: [],
  template: `<h2>{{ message }}</h2>`,
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class Confirm implements OnInit {
  message = '';

  constructor(private route: ActivatedRoute, private auth: Auth) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.confirmToken(token).subscribe({
        next: (res) => (this.message = 'Cuenta verificada correctamente'),
        error: () => (this.message = 'Token inválido o expirado'),
      });
    }
  }
}
