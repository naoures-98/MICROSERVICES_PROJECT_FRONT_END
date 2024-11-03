import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorHttpComponent } from './error-http.component';

describe('ErrorHttpComponent', () => {
  let component: ErrorHttpComponent;
  let fixture: ComponentFixture<ErrorHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorHttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
