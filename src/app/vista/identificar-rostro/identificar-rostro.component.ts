import { Component, EventEmitter, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ModelosService } from 'src/app/servicio/modelos.service';
import { ViewChild } from '@angular/core';
import { VideoService } from 'src/app/servicio/video.service';
import { HttpService } from 'src/app/servicio/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogIdentificarComponent } from 'src/app/componente/dialog-identificar/dialog-identificar.component';
import { EstadosService } from 'src/app/servicio/estados.service';

@Component({
  selector: 'app-identificar-rostro',
  templateUrl: './identificar-rostro.component.html',
  styleUrls: ['./identificar-rostro.component.scss']
})
export class IdentificarRostroComponent implements OnInit {

  // @ViewChild('video') video?: ElementRef;
  // @ViewChild('divVideo') div?: ElementRef

  public stream?: MediaStream;
  dimensionVideo?: { width: any; height: any; };
  name: string = ''
  confidence: string = ''

  constructor(
    private video: VideoService, 
    private http: HttpService, 
    public dialog: MatDialog,
    private estado: EstadosService
    ) {
   
  }

  ngOnInit(): void {
  }

  identificar(){
    this.openDialog();
    this.estado.cambiosEvento.emit({mesage:'Obteniendo imagen...', terminado: false});
    let data = this.video.captura();
    this.estado.cambiosEvento.emit({mesage:'Buscando rostros en la imagen...', terminado: false});
    this.http.detecionFace(data).subscribe(res => {
      console.log(res);
      this.estado.cambiosEvento.emit({mesage:'Comparando imagenes...', terminado: false});
      this.http.identify([res[0].faceId]).subscribe( res => {
        console.log(res);
        let candidates = res[0].candidates;
        console.log(res[0].candidates.length);
        if(candidates.length > 0)
          this.confidence = candidates[0].confidence
          this.estado.cambiosEvento.emit({mesage:'Obteniendo nombre del rostro', terminado: false});
          this.http.getPerson(candidates[0].personId).subscribe( res => {
            this.name = res.name;
            console.log(res)
            this.estado.cambiosEvento.emit({mesage:'Listo...', terminado: true})
          });  
      });
    });
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(DialogIdentificarComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('Dialogo cerraro');
    });
  }
}
