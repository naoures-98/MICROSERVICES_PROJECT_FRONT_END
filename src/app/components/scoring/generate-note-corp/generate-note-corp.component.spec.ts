import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNoteCorpComponent } from './generate-note-corp.component';

describe('GenerateNoteCorpComponent', () => {
  let component: GenerateNoteCorpComponent;
  let fixture: ComponentFixture<GenerateNoteCorpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateNoteCorpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateNoteCorpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
