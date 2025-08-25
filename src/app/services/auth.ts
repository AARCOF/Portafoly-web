import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './userService';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  profession: string;
  birthDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private API_URL = 'http://localhost:9090/user';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  confirmToken(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/confirm?token=${token}`);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(
      `${this.API_URL}/by-email?email=${encodeURIComponent(email)}`
    );
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, { email, password });
  }
}
