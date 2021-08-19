import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoService } from 'src/app/servicio/video.service';

@Component({
  selector: 'app-identificar-sena',
  templateUrl: './identificar-sena.component.html',
  styleUrls: ['./identificar-sena.component.scss']
})
export class IdentificarSenaComponent implements OnInit {

  @ViewChild('img1') img?: ElementRef;
  stream?: MediaStream;
  play?: boolean;

  constructor(private videoS: VideoService) { }

  ngOnInit(): void {
    this.stream = this.videoS.getStream();
    this.getVideo();
    console.log('Indentificar on init')
  }

  getVideo() {
    this.videoS.streamListo.subscribe( ()=>{
      this.stream = this.videoS.getStream();
      console.log(this.stream)
      this.play = true; 
    }, err => console.error(err));
  }
  
  identificar(): void {

  }

  capturar() {
    const video: HTMLVideoElement | null = document.querySelector('#video1');
    if (this.img && video) {
      this.videoS.captura(video, this.img);
    }
  }
}
