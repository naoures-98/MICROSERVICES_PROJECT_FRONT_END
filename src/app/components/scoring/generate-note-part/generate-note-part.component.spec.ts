import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNotePartComponent } from './generate-note-part.component';

describe('GenerateNotePartComponent', () => {
  let component: GenerateNotePartComponent;
  let fixture: ComponentFixture<GenerateNotePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateNotePartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateNotePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
