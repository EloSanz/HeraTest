import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MultimedialService } from '../services/multimedial.service';

@Component({
  selector: 'app-multimedial-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './multimedial-form.component.html',
  styleUrl: './multimedial-form.component.css'
})
export default class MultimedialFormComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private multimedialService = inject(MultimedialService);

  form = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    address: ['', [Validators.required]],
    birthdate: ['',[Validators.required]],
    educational_level_id: ['',[Validators.required]],
    graduation_institution: ['',[Validators.required]],
    profile_photo: ['',[Validators.required]]
  });

  create(){
    const multimedial = this.form.value;
    this.multimedialService.create(multimedial).subscribe(
      () => {
        this.router.navigate(['/']);
      });
  }
}
