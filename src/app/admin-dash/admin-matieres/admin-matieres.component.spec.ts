import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMatieresComponent } from './admin-matieres.component';

describe('AdminMatieresComponent', () => {
  let component: AdminMatieresComponent;
  let fixture: ComponentFixture<AdminMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMatieresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
