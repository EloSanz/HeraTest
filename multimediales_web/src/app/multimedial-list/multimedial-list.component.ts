import { Component, OnInit, inject } from '@angular/core';
import { MultimedialService } from '../services/multimedial.service';
import { RouterModule } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { Multimedial } from '../models/multimedial.interface';

@Component({
  selector: 'app-multimedial-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './multimedial-list.component.html',
  styleUrl: './multimedial-list.component.css'
})



export default class MultimedialListComponent implements OnInit{
  private multimedialService = inject(MultimedialService);

  multimediales: Multimedial [] = [];

  
  ngOnInit(): void {
      this.multimedialService.list().subscribe( multimedial => {
        this.multimediales = multimedial;
        //console.log(this.multimediales);
      });
  }
  
  listarMultimediales(): void {
    this.multimedialService.list().subscribe(multimediales => {
      this.multimediales = multimediales;
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
