import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfDashComponent } from './prof-dash.component';

describe('ProfDashComponent', () => {
  let component: ProfDashComponent;
  let fixture: ComponentFixture<ProfDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
