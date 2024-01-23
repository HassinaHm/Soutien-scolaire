import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEtudComponent } from './register-etud.component';

describe('RegisterEtudComponent', () => {
  let component: RegisterEtudComponent;
  let fixture: ComponentFixture<RegisterEtudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterEtudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterEtudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
