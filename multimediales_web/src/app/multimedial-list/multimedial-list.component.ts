import { Component, OnInit, inject } from '@angular/core';
import { MultimedialService } from '../services/multimedial.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-multimedial-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './multimedial-list.component.html',
  styleUrl: './multimedial-list.component.css'
})
export default class MultimedialListComponent implements OnInit{
  private multimedialService = inject(MultimedialService);

  multimediales: any [] = [];
  ngOnInit(): void {
      this.multimedialService.list().subscribe( (multimedial:any) => {
        this.multimediales = multimedial;
        //console.log(this.multimediales);
      });
  }


}
