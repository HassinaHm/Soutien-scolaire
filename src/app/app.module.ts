import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AddEtudComponent } from './admin-dash/add-etud/add-etud.component';
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
import { MatiereDComponent } from './details/matiere/matiered.component';
import { EtudiantsComponent } from './admin-dash/etudiants/etudiants.component';
import { ProfesseursComponent } from './admin-dash/professeurs/professeurs.component';
import { ProfessorDetailComponent } from './professeur/professor-detail/professor-detail.component';
import { AdminMatieresComponent } from './admin-dash/admin-matieres/admin-matieres.component';
import { AddProfComponent } from './admin-dash/add-prof/add-prof.component';

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
    MatiereDComponent,
    MatieresComponent,
    EtudiantsComponent,
    ProfesseursComponent,
    ProfessorDetailComponent,
    AdminMatieresComponent,AddProfComponent,
    AddEtudComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,MatIconModule,FormsModule,ReactiveFormsModule
    ,HttpClientModule,CommonModule,NgxPaginationModule,MatTableModule,MatPaginatorModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
