import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSegmentComponent } from './client-segment.component';

describe('ClientSegmentComponent', () => {
  let component: ClientSegmentComponent;
  let fixture: ComponentFixture<ClientSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientSegmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
