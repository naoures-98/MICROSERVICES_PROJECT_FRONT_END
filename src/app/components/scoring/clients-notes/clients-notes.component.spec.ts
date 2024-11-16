import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsNotesComponent } from './clients-notes.component';

describe('ClientsNotesComponent', () => {
  let component: ClientsNotesComponent;
  let fixture: ComponentFixture<ClientsNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientsNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
