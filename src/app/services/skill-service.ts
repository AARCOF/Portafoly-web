import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SkillDTO {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private API_URL = 'http://localhost:9090/skills';

  constructor(private http: HttpClient) {}
  // Obtener skills del usuario logueado
  getSkills(userId: number): Observable<SkillDTO[]> {
    return this.http.get<SkillDTO[]>(`${this.API_URL}/${userId}`);
  }

  // Crear skill para el usuario logueado
  addSkill(userId: number, skill: SkillDTO): Observable<SkillDTO> {
    return this.http.post<SkillDTO>(`${this.API_URL}/add/${userId}`, skill);
  }

  // Eliminar skill por id
  deleteSkill(skillId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${skillId}`);
  }
}
