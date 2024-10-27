import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancingNatureComponent } from './financing-nature.component';

describe('FinancingNatureComponent', () => {
  let component: FinancingNatureComponent;
  let fixture: ComponentFixture<FinancingNatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinancingNatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancingNatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
