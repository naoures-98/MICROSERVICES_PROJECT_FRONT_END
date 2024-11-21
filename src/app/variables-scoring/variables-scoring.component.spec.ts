import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesScoringComponent } from './variables-scoring.component';

describe('VariablesScoringComponent', () => {
  let component: VariablesScoringComponent;
  let fixture: ComponentFixture<VariablesScoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VariablesScoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VariablesScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
