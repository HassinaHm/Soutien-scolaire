import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere } from '../models/matiere';
import { Professeur } from '../models/professeur';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  private apiUrl = 'http://localhost:8081/matieres';
  private imageUrl = 'http://localhost:8081/api/images';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Matiere[]> {
    return this.httpClient.get<Matiere[]>(this.apiUrl);
  }

  private api = 'http://localhost:8081/api/professeurs/matieres';

  getProfesseursByMatiere(matiere: string): Observable<Professeur[]> {
    return this.httpClient.get<Professeur[]>(`${this.api}/${matiere}`);
  }

  getProfById(id: number): Observable<Matiere> {
    return this.httpClient.get<Matiere>(`${this.apiUrl}/${id}`);
  }

  saveTest(matiere: Matiere): Observable<Matiere> {
    return this.httpClient.post<Matiere>(this.apiUrl, matiere);
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
    return `${this.imageUrl}/${imageName}`;
  }
  
  
  updateProf(id: number, matiere: Matiere): Observable<Matiere> {
    return this.httpClient.put<Matiere>(`${this.apiUrl}/${id}`, matiere);
  }

  deleteProf(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }



}
