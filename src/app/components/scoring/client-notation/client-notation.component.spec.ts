import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientNotationComponent } from './client-notation.component';

describe('ClientNotationComponent', () => {
  let component: ClientNotationComponent;
  let fixture: ComponentFixture<ClientNotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientNotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
