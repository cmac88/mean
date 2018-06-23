import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
  this.getPets();
}
addPet(newPet){
  return this._http.post('/api/pets', newPet)
}

getPets(){
  return this._http.get('/api/pets');
}
grabPet(id){
  return this._http.get('/api/pets/'+id)
}

editPet(id, editOf){
  console.log(editOf)
  return this._http.put('/api/pets/'+id, editOf)
}

deletePet(id){
  return this._http.delete('/api/pets/'+id)
}
like(id){
  return this._http.put('/api/pets/like/' + id)
}
}