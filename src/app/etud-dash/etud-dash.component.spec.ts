import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudDashComponent } from './etud-dash.component';

describe('EtudDashComponent', () => {
  let component: EtudDashComponent;
  let fixture: ComponentFixture<EtudDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtudDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtudDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
