import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimedialService {

  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/api/multimediales')
  }
  get(id: number){
    return this.http.get('http://localhost:8080/api/multimediales/${id}')
  }
  create(multimedial: any){
    return this.http.post('http://localhost:8080/api/multimediales', multimedial)
  }
  update(id: number,multimedial: any){
    return this.http.put('http://localhost:8080/api/multimediales/${id}', multimedial)
  }
  delete(id: number){
    return this.http.delete('http://localhost:8080/api/multimediales/${id}')
  }
}
