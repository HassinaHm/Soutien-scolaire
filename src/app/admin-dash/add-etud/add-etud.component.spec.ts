import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtudComponent } from './add-etud.component';

describe('AddEtudComponent', () => {
  let component: AddEtudComponent;
  let fixture: ComponentFixture<AddEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
