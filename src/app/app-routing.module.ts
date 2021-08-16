import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificarRostroComponent } from './vista/identificar-rostro/identificar-rostro.component';
import { PrincipalComponent } from './vista/principal/principal.component';
import { PruebaComponent } from './vista/prueba/prueba.component';
import { RegistralComponent } from './vista/registral/registral.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent, pathMatch: 'full'},
  // {path: '', component: PruebaComponent, pathMatch: 'full'},
  {path: 'Identificar_Rostro', component: PruebaComponent},
  {path: 'Registral_personal', component: RegistralComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
