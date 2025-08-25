import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface LanguageDTO {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private API_URL = 'http://localhost:9090/languages';

  constructor(private http: HttpClient) {}

  getLanguagesByUser(userId: number): Observable<LanguageDTO[]> {
    return this.http.get<LanguageDTO[]>(`${this.API_URL}/${userId}`);
  }

  addLanguage(userId: number, lang: LanguageDTO): Observable<LanguageDTO> {
    return this.http.post<LanguageDTO>(`${this.API_URL}/add/${userId}`, lang);
  }

  deleteLanguage(languageId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${languageId}`);
  }
}
