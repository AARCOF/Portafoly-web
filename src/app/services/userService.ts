import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  birthDate: string;
  enabled: boolean;
  skills: string[];
  languages: string[];
}

export interface UpdateUserRequest {
  phone: string;
  profession: string;
  birthDate: string;
  skills: string[];
  languages: string[];
}

export interface SkillDTO {
  id?: number;
  name: string;
  level?: number;
}

export interface PublicUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  profession?: string;
  birthDate?: string;
  enabled?: boolean;
  skills: SkillDTO[]; // el buscador mostrará nombres desde aquí
  languages: string[]; // para el explorer las tratamos como strings
  profileImageUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:9090/user';

  private loggedUser: User | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/by-email?email=${email}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  updateUser(id: number, data: any): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${id}`, data);
  }

  // Guardar usuario logueado en memoria y localStorage
  setLoggedUser(user: User): void {
    this.loggedUser = user;
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  // Obtener usuario logueado desde memoria o localStorage
  getLoggedUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    if (!this.loggedUser) {
      const user = localStorage.getItem('loggedUser');
      this.loggedUser = user ? JSON.parse(user) : null;
    }
    return this.loggedUser;
  }

  // Limpiar usuario al hacer logout
  clearLoggedUser(): void {
    this.loggedUser = null;
    localStorage.removeItem('loggedUser');
  }

  // Listar todos (modo explorar)
  getAllUsers(): Observable<PublicUser[]> {
    return this.http.get<PublicUser[]>(`${this.API_URL}`);
  }

  // Buscar por nombre y/o habilidad (ambos opcionales)
  searchUsers(name?: string, skill?: string): Observable<PublicUser[]> {
    let params = new HttpParams();
    if (name && name.trim()) params = params.set('name', name.trim());
    if (skill && skill.trim()) params = params.set('skill', skill.trim());
    return this.http.get<PublicUser[]>(`${this.API_URL}/search`, { params });
  }
}
