import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './accueil/accueil.component';
import { FooterComponent } from './footer/footer.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfesseurComponent } from './professeur/professeur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { RegisterEtudComponent } from './register-etud/register-etud.component';
import { ProfEtudComponent } from './prof-etud/prof-etud.component';
import { TestComponent } from './test/test.component';
import { ProfDashComponent } from './prof-dash/prof-dash.component';
import { AddTestComponent } from './add-test/add-test.component';
import { ProfComponent } from './details/prof/prof.component';
import { MatieresComponent } from './matieres/matieres.component';
import { MatiereComponent } from './details/matiere/matiere.component';
import { EtudiantsComponent } from './admin-dash/etudiants/etudiants.component';
import { ProfesseursComponent } from './admin-dash/professeurs/professeurs.component';
import { AdminMatieresComponent } from './admin-dash/matieres/matieres.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    FooterComponent,
    EtudiantComponent,
    ProfesseurComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashComponent,
    RegisterEtudComponent,
    ProfEtudComponent,
    TestComponent,
    ProfDashComponent,
    MatieresComponent,
    AddTestComponent,
    ProfComponent,
    MatiereComponent,
    MatieresComponent,
    EtudiantsComponent,
    ProfesseursComponent,
    AdminMatieresComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,MatIconModule,FormsModule,ReactiveFormsModule
    ,HttpClientModule,CommonModule,NgxPaginationModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
