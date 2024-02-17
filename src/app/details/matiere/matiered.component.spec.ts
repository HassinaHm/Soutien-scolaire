import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereDComponent } from './matiered.component';

describe('MatiereComponent', () => {
  let component: MatiereDComponent;
  let fixture: ComponentFixture<MatiereDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatiereDComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatiereDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
