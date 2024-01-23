import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterEtudComponent } from './register-etud/register-etud.component';
import { ProfEtudComponent } from './prof-etud/prof-etud.component';
import { TestComponent } from './test/test.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { EtudDashComponent } from './etud-dash/etud-dash.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'register-etud',
    component:RegisterEtudComponent
  },
  {
    path:'prof-etud',
    component:ProfEtudComponent
  },
  {
    path:'test',
    component:TestComponent
  },
  {
    path:'professeur',
    component:AdminDashComponent
  },
  {
    path:'etudiant',
    component:EtudDashComponent
  },
  {
    path:'admin',
    component:AdminDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
