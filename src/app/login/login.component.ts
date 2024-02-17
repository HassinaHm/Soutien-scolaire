
import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nom!: string;
  password!: string;

  constructor(private authService: AuthenticationService) {}

  login() {
    this.authService.login(this.nom, this.password).subscribe(
      response => {
        // Handle successful login
        console.log('Login successful:', response);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }
}
