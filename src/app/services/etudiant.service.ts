import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {


  private apiUrl = 'http://localhost:8081/api/etudiants';

  constructor(private httpClient: HttpClient) {}


  getAll(): Observable<Etudiant[]> {
    return this.httpClient.get<Etudiant[]>(this.apiUrl);
  }


  getEtudbyId(id: number): Observable<Etudiant> {
    return this.httpClient.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  saveEtud(etud: Etudiant): Observable<Etudiant> {
    return this.httpClient.post<Etudiant>(this.apiUrl, etud);
  }

 
  
  updateEtud(id: number, etud: Etudiant): Observable<Etudiant> {
    return this.httpClient.put<Etudiant>(`${this.apiUrl}/${id}`, etud);
  }

  deleteEtud(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
