import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
  	return this._http.get('/pets');
  }

  getPet(id){
  	return this._http.get('/pets/'+id);
  }

  newPet(data){
    console.log(data)
  	return this._http.post('/pets', data);
  }

  editPet(data){
    return this._http.put('/pets/'+data._id, data);
  }

  addSkill(data){
    return this._http.put('/pets/'+data._id+'/skills', data);
  }

  adopt(id){
    return this._http.delete('/pets/'+id);
  }

  like(id){
  	return this._http.get('/pets/'+id+'/like');
  }

}
