import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

//Componenetes
import { PrincipalComponent } from './vista/principal/principal.component';
import { WebCamComponent } from './componente/web-cam/web-cam.component'
import { PruebaComponent } from './vista/prueba/prueba.component';
import { RegistralComponent } from './vista/registral/registral.component';
import { IdentificarRostroComponent } from './vista/identificar-rostro/identificar-rostro.component';

// otros
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogIdentificarComponent } from './componente/dialog-identificar/dialog-identificar.component';


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    IdentificarRostroComponent,
    PruebaComponent,
    RegistralComponent,
    WebCamComponent,
    DialogIdentificarComponent
  ],
  imports: [
    BrowserModule,
    //Angular material
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    //Otros
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
