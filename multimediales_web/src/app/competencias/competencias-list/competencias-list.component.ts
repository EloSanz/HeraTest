import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CompetenciasService } from '../../services/competencias.service';
import { Router, RouterModule } from '@angular/router';
import { Competencias } from '../../models/competencias.interface';

@Component({
  selector: 'app-competencias-list',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './competencias-list.component.html',
  styleUrl: './competencias-list.component.css',
})
export default class CompetenciasListComponent implements OnInit{


  private competenciasService = inject(CompetenciasService);
  private router = inject(Router);

  competencias: Competencias[] = [];

  ngOnInit(): void {
    this.listarCompetencias();
  }

  listarCompetencias(): void {
    this.competenciasService.list().subscribe(competencias => {
      this.competencias = competencias.sort((a: Competencias, b: Competencias) => {
        return a.id - b.id; 
      });
    });
  }

  listarCompetenciasOrdenadasPorNivelDestreza(): void {
    this.competenciasService.list().subscribe(competencias => {
      this.competencias = competencias.sort((a: Competencias, b: Competencias) => {
        return a.nivel_destreza - b.nivel_destreza; 
      });
    });
  }

  //update
  editarCompetencia(competencia: Competencias) {
    this.router.navigate(['competencias/edit'], { queryParams: {competencia: JSON.stringify(competencia) } });
  }

  //delete
  eliminarCompetencia(id: number) {
    this.competenciasService.delete(id).subscribe(() =>
    {
      this.listarCompetencias();
    });
    } 
    getTipoCompetenciaText(value: number): string {
      switch (value) {
        case 1:
          return 'EDICION_VIDEO';
        case 2:
          return 'EDICION_IMAGEN';
        case 3:
          return 'EDICION_TEXTO';
        case 4:
          return 'EDICION_PPT';
        default:
          return ''; // Puedes retornar un valor predeterminado o un mensaje de error si el valor no es válido
      }
    }
    
}
