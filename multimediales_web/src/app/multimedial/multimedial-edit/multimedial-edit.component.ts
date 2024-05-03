import { CommonModule, formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Multimedial } from '../../models/multimedial.interface';
import { MultimedialService } from '../../services/multimedial.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Asegúrate de importar FormsModule y ReactiveFormsModule

@Component({
  selector: 'app-multimedial-edit',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule
  ],
  templateUrl: './multimedial-edit.component.html',
  styleUrl: './multimedial-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MultimedialEditComponent implements OnInit{
  public form!: FormGroup;
  public multimedial!: Multimedial;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private multimedialService: MultimedialService
  ) {}

    private initForm(): void {
      this.form = this.fb.group({
        username: [this.multimedial.username, Validators.required],
        email: [this.multimedial.email, [Validators.required, Validators.email]],
        password: [this.multimedial.password],
        address: [this.multimedial.address],
        birthdate: [formatDate(this.multimedial.birthdate, 'dd/MM/yyyy', 'en-US')],
        educational_level_id: [this.multimedial.educational_level_id],
        graduation_institution: [this.multimedial.graduation_institution],
        profile_photo: [this.multimedial.profile_photo]
      });
  }
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.multimedial = JSON.parse(params['multimedial']);
      //console.log(this.multimedial);
      this.initForm();
    });
  }
  editar() {
    const multimedialUpdated: Multimedial = { ...this.multimedial, ...this.form.value };
    this.multimedialService.update(multimedialUpdated.id, multimedialUpdated).subscribe(() => {
      this.router.navigate(['/multimediales']);
    });
  }
  
 }
