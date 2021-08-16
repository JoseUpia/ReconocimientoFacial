import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from "../../environments/config";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private urlAddPerson = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/persongroups/faceapp01/persons'
  key1 = 'e45b6a937fa2466e978bfbe709261a86'
  key2 = config.clave2
  private url: string = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_04&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400';

  private body: any = {url: 'https://elpersonalista.com/wp-content/uploads/2018/05/lentes.jpg'}

  private headersJson = new HttpHeaders(
    { 
    'Content-Type': 'application/json', 
    'Ocp-Apim-Subscription-Key': this.key1
    }
  );

  private headersOctent = new HttpHeaders({
        'Content-Type':  'application/octet-stream',
        'Ocp-Apim-Subscription-Key': this.key1
      })

  constructor(private http: HttpClient) { 
  }

  getPerson(personId: string): Observable<any> {
    let url = `https://centralus.api.cognitive.microsoft.com/face/v1.0/persongroups/faceapp01/persons/${personId}`;
    return this.http.get(url, {headers: this.headersJson});
  }
  
  addPerson(name: String): Observable<any> {
    let body = {name: name};
    return this.http.post<any>(this.urlAddPerson, body, {headers: this.headersJson});
  }

  addFaceToPerson(personId: string, data: any): Observable<{persistedFaceId: string}> {
    let url = `https://centralus.api.cognitive.microsoft.com/face/v1.0/persongroups/faceapp01/persons/${personId}/persistedFaces?detectionModel=detection_01`
    return this.http.post<{persistedFaceId: string}>(url, this.makeblob(data), {headers: this.headersOctent});
  }

  train(): Observable<any> {
    let url = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/persongroups/faceapp01/train'
    return this.http.post(url,{}, {headers: this.headersJson})
  }

  training(){
    let url = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/persongroups/faceapp01/training'
    return this.http.post(url, {}, {headers: this.headersJson})
  }

  detecionFace(data: any): Observable<any>{
    let url = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_03&faceIdTimeToLive=86400';
    return this.http.post<any>(url, this.makeblob(data), {headers: this.headersOctent});
  }

  identify(faceIds: string[]): Observable<any>{
    let url = 'https://centralus.api.cognitive.microsoft.com/face/v1.0/identify';
    let body = {
      personGroupId: 'faceapp01',
      faceIds: faceIds,
      maxNumOfCandidatesReturned: 1,
      confidenceThreshold: 0.5
    };
    return this.http.post(url, body, {headers: this.headersJson});
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

