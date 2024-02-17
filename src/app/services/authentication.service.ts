// authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'http://localhost:8081/api/v1/auth/register';
  private apiUrllogin = 'http://localhost:8081/api/v1/auth/authenticate';


  constructor(private http: HttpClient) {}

  registerEtudiant(etudiantData: any) {
        return this.http.post<any>(this.apiUrl, etudiantData);
 }


  register(registerData: any) {
    return this.http.post<any>('localhost/8081/api/v1/auth/register/professeur', registerData);
  }


  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrllogin, { username, password });
  }

}
