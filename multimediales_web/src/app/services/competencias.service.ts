import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competencias } from '../models/competencias.interface';

@Injectable({
  providedIn: 'root'
})
export class CompetenciasService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Competencias[]>('http://localhost:8080/api/competencias');
  }

  get(id: number) {
    return this.http.get<Competencias>(`http://localhost:8080/api/competencias/${id}`);
  }

  create(competencias: any) {
    return this.http.post<Competencias>('http://localhost:8080/api/competencias', competencias);
  }

  update(id: number, competencias: any) {
    return this.http.put<Competencias>(`http://localhost:8080/api/competencias/${id}`, competencias);
  }

  delete(id: number) {
    return this.http.delete<void>(`http://localhost:8080/api/competencias/${id}`);
  }
}
