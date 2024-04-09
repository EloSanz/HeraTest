import { Component, OnInit, inject } from '@angular/core';
import { MultimedialService } from '../services/multimedial.service';
import { RouterModule } from '@angular/router';
import { formatDate } from '@angular/common';
import { Multimedial } from '../models/multimedial.interface';

@Component({
  selector: 'app-multimedial-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './multimedial-list.component.html',
  styleUrl: './multimedial-list.component.css'
})



export default class MultimedialListComponent implements OnInit{
  private multimedialService = inject(MultimedialService);

  multimediales: Multimedial [] = [];

  
  ngOnInit(): void {
      this.multimedialService.list().subscribe( multimedial => {
        this.multimediales = multimedial;
        this.formatDateOfBirth();
        //console.log(this.multimediales);
      });
  }
  
  formatDateOfBirth(): void {
    this.multimediales.forEach(multimedial => {
      multimedial.birthdate = formatDate(multimedial.birthdate, 'dd/MM/yyyy', 'en-US');
    });
  }

  listarMultimediales(): void {
    this.multimedialService.list().subscribe(multimediales => {
      this.multimediales = multimediales;
      this.formatDateOfBirth();
    });
  }
  eliminarMultimedial(id: number): void {
    this.multimedialService.delete(id).subscribe(() => {
      this.listarMultimediales();
    });
  }

  editarMultimedial(id: number, multimedial: Multimedial): void {
    this.multimedialService.update(id, multimedial).subscribe(() => {
      this.listarMultimediales();
    });
  }

  
}
