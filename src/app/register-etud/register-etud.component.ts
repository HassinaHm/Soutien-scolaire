import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-etud',
  templateUrl: './register-etud.component.html',
  styleUrls:[ './register-etud.component.css']
})
export class RegisterEtudComponent {
  registerForm!: FormGroup;

  constructor(private authService: AuthenticationService,private fb: FormBuilder) {}


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:['ADMIN']

    });}


  register(){
    this.authService.registerEtudiant(this.registerForm.value).subscribe(
      response => {
        console.log('Registration successful');
      },
      error => {
        console.error('Registration failed:', error);
      }
    );
  }
 


}
