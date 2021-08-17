import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificarRostroComponent } from './vista/identificar-rostro/identificar-rostro.component';
import { PrincipalComponent } from './vista/principal/principal.component';
import { RegistralComponent } from './vista/registral/registral.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
