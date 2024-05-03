import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Competencias } from '../../models/competencias.interface';
import { MultimedialService } from '../../services/multimedial.service';
import { CompetenciasService } from '../../services/competencias.service';

@Component({
  selector: 'app-competencias-edit',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  templateUrl: './competencias-edit.component.html',
  styleUrl: './competencias-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CompetenciasEditComponent { 
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private competenciasService = inject(CompetenciasService);
  private route = inject(ActivatedRoute);

  private activatedRoute = inject (ActivatedRoute);
  public form!: FormGroup;

  public competencia!: Competencias;

  public multimedialId: number | null = null; // Inicializamos con null
    
  private initForm(): void{
    this.form =  this.fb.group({
      id: [this.competencia.id],
      multimedialId: [this.competencia.multimedialId],
      tipo_competencia: [this.competencia.tipo_competencia, Validators.required],
      nombre_competencia: [this.competencia.nombre_competencia, Validators.required],
      nivel_destreza: [this.competencia.nivel_destreza, Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.competencia = JSON.parse(params['competencia']);
      this.initForm();
      //console.log(this.competencia);
    });
  }
  
  editar() {
    const competenciaUpdated: Competencias = { ...this.competencia, ...this.form.value };
    this.competenciasService.update(competenciaUpdated.id, competenciaUpdated).subscribe(() => {
      this.router.navigate(['/competencias']);
    });
  }

}
