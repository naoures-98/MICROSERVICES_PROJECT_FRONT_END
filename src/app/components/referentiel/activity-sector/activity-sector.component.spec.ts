import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySectorComponent } from './activity-sector.component';

describe('ActivitySectorComponent', () => {
  let component: ActivitySectorComponent;
  let fixture: ComponentFixture<ActivitySectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivitySectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
