import { HttpHeaders } from "@angular/common/http";

const clave1 = 'e45b6a937fa2466e978bfbe709261a86';
const cleve2 = '';

export let config = {
    host: 'https://centralus.api.cognitive.microsoft.com/face/v1.0/',
    clave1: clave1,
    clave2: '',
    personGruop: 'faceapp01',
    headers: {
        Octent_stream: new HttpHeaders({'Content-Type':  'application/octet-stream', 'Ocp-Apim-Subscription-Key': clave1}),
        JSON: new HttpHeaders({'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': clave1}),
    },
    atributo: {
        detectionModel: 'detection_03',
        recognitionModel:'recognition_03',
        returnFaceId: 'true',
        returnFaceLandmarks: 'false',
        returnRecognitionModel: 'false',
        faceIdTimeToLive:'86400'
    }
}