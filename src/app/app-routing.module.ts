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
import { MatiereComponent } from './details/matiere/matiere.component';

const routes: Routes = [
  {
    path:'',
    component:AccueilComponent
  },
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
    component:ProfComponent
  },
  {
    path:'prof-dash',
    component:ProfDashComponent
  },
  
  {
    path:'admin',
    component:AdminDashComponent
  },
  {
    path:'matieres',
    component:MatiereComponent
  },
  {  
  path:'adminAuth',
  component:AdminDashComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
