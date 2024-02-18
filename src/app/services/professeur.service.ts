import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professeur } from '../models/professeur';  

@Injectable({
  providedIn: 'root'
})
export class ProfesseurService {


  private apiUrl = 'http://localhost:8081/api/professeurs';
  private imageUrl = 'http://localhost:8081/api';

  constructor(private httpClient: HttpClient) {}


  getAll(): Observable<Professeur[]> {
    return this.httpClient.get<Professeur[]>(this.apiUrl);
  }


  getProfById(id: number): Observable<Professeur> {
    return this.httpClient.get<Professeur>(`${this.apiUrl}/${id}`);
  }

  saveProf(prof: Professeur): Observable<Professeur> {
    return this.httpClient.post<Professeur>(this.apiUrl, prof);
  }

  async uploadImage(formData: FormData): Promise<string | undefined> {
    const uploadUrl = 'http://localhost:8081/api/images/upload';
    try {
      const imageUrl = await this.httpClient.post(uploadUrl, formData, { responseType: 'text' }).toPromise();
      return imageUrl as string;
    } catch (error) {
      console.error('Error uploading image:', error);
      return undefined;
    }
  }

  getImageUrl( imageName: string): string {
    return `${this.imageUrl}${imageName}`;
  }
  
  
  updateProf(id: number, prof: Professeur): Observable<Professeur> {
    return this.httpClient.put<Professeur>(`${this.apiUrl}/${id}`, prof);
  }

  deleteProf(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
