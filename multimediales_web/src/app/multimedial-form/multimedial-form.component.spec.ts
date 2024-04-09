import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultimedialFormComponent } from './multimedial-form.component';

describe('MultimedialFormComponent', () => {
  let component: MultimedialFormComponent;
  let fixture: ComponentFixture<MultimedialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultimedialFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultimedialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
