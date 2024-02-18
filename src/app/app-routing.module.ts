import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEtudComponent } from './register-etud/register-etud.component';
import { ProfEtudComponent } from './prof-etud/prof-etud.component';
import { TestComponent } from './test/test.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ProfDashComponent } from './prof-dash/prof-dash.component';
import { ProfComponent } from './details/prof/prof.component';
import { MatiereDComponent } from './details/matiere/matiered.component';
import { ProfessorDetailComponent } from './professeur/professor-detail/professor-detail.component';
import { ProfesseursComponent } from './admin-dash/professeurs/professeurs.component';
import { AdminMatieresComponent } from './admin-dash/admin-matieres/admin-matieres.component';
import { EtudiantsComponent } from './admin-dash/etudiants/etudiants.component';


const routes: Routes = [
  {
    path: '',
    component: AccueilComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'register-etud',
    component: RegisterEtudComponent
  },
  {
    path: 'prof-etud',
    component: ProfEtudComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'professeur',
    component: ProfComponent
  },
  {
    path: 'prof-dash',
    component: ProfDashComponent
  },
  // { path: 'login', component: LoginComponent },
  // { path: 'adminAuth', component: AdminDashComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  // { path: 'prof-dash', component: ProfDashComponent, canActivate: [AuthGuard], data: { roles: ['professeur'] } },
  // { path: 'etud-dash', component: EtudiantsComponent, canActivate: [AuthGuard], data: { roles: ['etudiant'] } },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
  { 
    path: 'adminAuth', 
    component: AdminDashComponent,
    children: [
      { path: 'admin-prof', component: ProfesseursComponent },
      { path: 'admin-etudiant', component: EtudiantsComponent },
      { path: 'admin-matiere', component: AdminMatieresComponent },
      { path: '', redirectTo: 'admin-prof', pathMatch: 'full' } 
    ]
  },
  
  {
    path: 'matieres',
    component: MatiereDComponent
  },
  {
    path: 'professeur/:id',
    component: ProfessorDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
