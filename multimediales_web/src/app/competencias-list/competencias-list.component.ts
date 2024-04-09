import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CompetenciasService } from '../services/competencias.service';
import { Router, RouterModule } from '@angular/router';
import { Competencias } from '../models/competencias.interface';

@Component({
  selector: 'app-competencias-list',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './competencias-list.component.html',
  styleUrl: './competencias-list.component.css',
})
export default class CompetenciasListComponent { 
  private competenciasService = inject(CompetenciasService);
  private router = inject(Router);

  competencias: Competencias[] = [];

  ngOnInit(): void {
    this.competenciasService.list().subscribe(competencia => {
      this.competencias = competencia;
      });
  }

  listarCompetencias(): void {
    this.competenciasService.list().subscribe(competencia => {
      this.competencias = competencia;
    });
  }

  mostrarCompetenciasSinParametro(): void {
    this.router.navigate(['/competencias']);
  }

  mostrarCompetenciasConParametro(multimedialId: number): void {
    this.router.navigate(['/competencias'], { queryParams: { multimedialId: multimedialId } });
  } //sin uso aun
  

}
