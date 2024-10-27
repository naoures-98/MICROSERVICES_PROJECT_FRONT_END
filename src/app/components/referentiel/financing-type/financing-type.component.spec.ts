import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingTypeComponent } from './financing-type.component';

describe('FinancingTypeComponent', () => {
  let component: FinancingTypeComponent;
  let fixture: ComponentFixture<FinancingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancingTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
