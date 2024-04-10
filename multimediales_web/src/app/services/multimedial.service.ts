import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Multimedial } from '../models/multimedial.interface';

@Injectable({
  providedIn: 'root'
})
export class MultimedialService {

  private http = inject(HttpClient);

  list(){
    return this.http.get<Multimedial[]>('http://localhost:8080/api/multimediales')
  }
  get(id: number){
    return this.http.get<Multimedial>('http://localhost:8080/api/multimediales/' + id)
  }
  create(multimedial: any){
    return this.http.post<Multimedial>('http://localhost:8080/api/multimediales', multimedial)
  }
  update(id: number,multimedial: Multimedial){
    return this.http.put<Multimedial>('http://localhost:8080/api/multimediales/' + id, multimedial)
  }
  delete(id: number){
    return this.http.delete<void>('http://localhost:8080/api/multimediales/'+ id )
    //return this.http.delete<void>(`http://localhost:8080/api/multimediales/${id}`);
  }

}
