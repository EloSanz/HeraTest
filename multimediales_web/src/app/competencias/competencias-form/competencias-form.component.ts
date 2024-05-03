import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompetenciasService } from '../../services/competencias.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-competencias-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './competencias-form.component.html',
  styleUrls: ['./competencias-form.component.css']
})
export default class CompetenciasFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private competenciasService = inject(CompetenciasService);
  private route = inject(ActivatedRoute);
  
  public multimedialId: number | null = null; // Inicializamos con null
    
  form =  this.fb.group({
    multimedialId: [this.multimedialId],
    tipo_competencia: ['', Validators.required],
    nombre_competencia: ['', Validators.required],
    nivel_destreza: ['', Validators.required]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.multimedialId = params['multimedialId']; // Establecemos el valor de multimedialId
      this.form.patchValue({ multimedialId: this.multimedialId }); // Actualizamos el valor del campo en el formulario
    });
  }
  
  create() {
    const competencia = this.form.value;
    this.competenciasService.create(competencia).subscribe(
      () => {
        this.router.navigate(['/competencias']);
      });
  }
}
