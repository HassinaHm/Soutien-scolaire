import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  login(credentials: Credential): Observable<TokenResponse> {
<<<<<<< HEAD
=======
    // Send login request to the server
>>>>>>> 05b7baf0a8cbcd40b015df8a16f36902574f8750
    return this.http.post<TokenResponse>('localhost/8081/api/v1/auth/login', credentials);
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
