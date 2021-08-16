import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EstadosService } from 'src/app/servicio/estados.service';
import { HttpService } from 'src/app/servicio/http.service';
import { VideoService } from 'src/app/servicio/video.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogIdentificarComponent } from 'src/app/componente/dialog-identificar/dialog-identificar.component';


@Component({
  selector: 'app-registral',
  templateUrl: './registral.component.html',
  styleUrls: ['./registral.component.scss']
})
export class RegistralComponent implements OnInit {

  @ViewChild('img') img?: ElementRef
  @ViewChild('video') videoE?: ElementRef;

  name: string = '';
  dataImg: any;

  constructor(
    private video: VideoService, 
    private http: HttpService, 
    public dialog: MatDialog,
    private estado: EstadosService) { }

  ngOnInit(): void {
  }

  capturar() {
    if (this.img) {
      this.dataImg  = this.video.captura(this.img);
    }
  }

  registral() {
    this.openDialog();
    this.estado.cambiosEvento.emit({mesage: 'Iniciando...', terminado: false});
    if (this.dataImg && this.name != ''){
      this.estado.cambiosEvento.emit({mesage: 'Creando persona...', terminado: false});
      this.http.addPerson(this.name).subscribe( res => {
        console.log(res);
        this.estado.cambiosEvento.emit({mesage: 'Enviando imagen...', terminado: false});
        this.http.addFaceToPerson(res.personId, this.dataImg).subscribe( res => {
          console.log(res)
          this.estado.cambiosEvento.emit({mesage: 'Listo...', terminado: true});
        });
      });
      
    }else{
      this.estado.cambiosEvento.emit({mesage: 'Debe completar el proceso antes de regitral', terminado: true});
      console.log('no iniciado')
    }
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

