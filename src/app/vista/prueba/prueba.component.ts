import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';
import { HttpService } from 'src/app/servicio/http.service';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.scss']
})
export class PruebaComponent implements OnInit {

  stream?: MediaStream;
  url = '../../../assets/models'

  @ViewChild('miVideo') video?: ElementRef;
  @ViewChild('canvas') canvas?: ElementRef;
  @ViewChild('inputVideo') cheackVideo?: ElementRef
  @ViewChild('captura') captura?: ElementRef
  @ViewChild('img') img?: ElementRef
  @ViewChild('text') text?: ElementRef

  play: boolean = false;

  constructor(private renderer2: Renderer2, private api: HttpService) { }

  ngOnInit(): void {
    this.modelo();
  }
  getVideo() {
    if (navigator && navigator.mediaDevices.getUserMedia({ video: true })) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(
          stream => {
            this.stream = stream
            this.play = true;
          },
          err => console.error(err)
        ).catch(
          err => console.error(err)
        );
    } else {
      console.log('No se encuentran dispositivos de video.')
      alert('errore')
    }
  }
  
  modelo() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(this.url),
      faceapi.nets.faceLandmark68Net.loadFromUri(this.url),
      faceapi.nets.faceExpressionNet.loadFromUri(this.url),
      faceapi.nets.ageGenderNet.loadFromUri(this.url)
    ]).then(() => this.getVideo());
  }

  detencion() {
    console.log('dasda');
    setInterval(async () => {
      if (this.video && this.canvas) {

        const detection = await faceapi.detectAllFaces(
          this.video.nativeElement,
          new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
          
        const displaySize = { width: this.video.nativeElement.width, height: this.video.nativeElement.height };

        faceapi.matchDimensions(this.canvas.nativeElement, displaySize);

        if (displaySize && detection) {
          const resizedResults = faceapi.resizeResults(detection, displaySize);

          if (resizedResults) {
            faceapi.draw.drawFaceLandmarks(this.canvas.nativeElement, resizedResults);
            faceapi.draw.drawDetections(this.canvas.nativeElement, resizedResults);
          }
        }
      }
    }, 100);
  }

  controlVideo() {
   this.play = this.cheackVideo?.nativeElement.checked;
  }

  post() {
    if(this.stream && this.img){
      let width = this.video?.nativeElement.width;
      let height = this.video?.nativeElement.height;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      const imga = document.createElement('img');
   
      canvas.getContext('2d')?.drawImage(this.video?.nativeElement, 0, 0, width, height);
      let data = canvas.toDataURL('imagen/png');

       console.log(this.makeblob(data))
      // this.api.getPosh(this.makeblob(data));
      this.img.nativeElement.setAttribute('src', data);
    }
  }

  makeblob(dataURL: any) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
}
