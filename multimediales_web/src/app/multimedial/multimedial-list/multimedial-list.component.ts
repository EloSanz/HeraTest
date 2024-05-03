import { Component, OnInit } from '@angular/core';
import { MultimedialService } from '../../services/multimedial.service';
import { Router, RouterLink } from '@angular/router';
import { Multimedial } from '../../models/multimedial.interface';
import { CommonModule } from '@angular/common'; 
import { CompetenciasService } from '../../services/competencias.service';
import { Observable, map, take } from 'rxjs';

@Component({
  selector: 'app-multimedial-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './multimedial-list.component.html',
  styleUrls: ['./multimedial-list.component.css']
})
export default class MultimedialListComponent implements OnInit {
 
  
  multimediales: Multimedial[] = [];
  hasCompetenciasValue: boolean = false;
  hasCompetencias: boolean[] = []; //lo cargo una vez 

  constructor(
    private competenciasService: CompetenciasService,
    private multimedialService: MultimedialService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadMultimediales();
  }


  loadMultimediales(): void {
    this.multimedialService.list().subscribe((multimediales: Multimedial[]) => {
      this.multimediales = multimediales.sort((a: Multimedial, b: Multimedial) => {
        return a.id - b.id; 
      });
      
      this.multimediales.forEach(multimedial => {
        
        this.competenciasService.existsByMultimedialId(multimedial.id).subscribe(hasCompetencias => {
          
          this.hasCompetencias[multimedial.id] = hasCompetencias;
          //console.log(`Multimedial ${multimedial.id} tiene competencias: ${hasCompetencias}`);

        });

      });

    });

  }
  tieneCompetencias(id: number): Observable<boolean> {
    return this.competenciasService.existsByMultimedialId(id).pipe(
      map((result: any) => !!result), // Convertir el resultado en un booleano
      take(1) // Obtener solo el primer valor emitido
    );
  }

  eliminarMultimedial(id: number): void {
    this.multimedialService.delete(id).subscribe(() => {
      this.loadMultimediales();
    });
  }

  editarMultimedial(multimedial: Multimedial): void {
    this.router.navigate(['multimedial/edit'], { queryParams: { multimedial: JSON.stringify(multimedial) } });
  }

  getEducationalLevelText(value: number): string {
    switch (value) {
      case 1:
        return 'Universitario Completo';
      case 2:
        return 'Universitario Incompleto';
      case 3:
        return 'Terciario Completo';
      case 4:
        return 'Terciario Incompleto';
      default:
        return ''; // Puedes retornar un valor predeterminado o un mensaje de error si el valor no es válido
    }
  }
}
