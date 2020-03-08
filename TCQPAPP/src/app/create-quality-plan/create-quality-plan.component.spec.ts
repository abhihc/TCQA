import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQualityPlanComponent } from './create-quality-plan.component';

describe('CreateQualityPlanComponent', () => {
  let component: CreateQualityPlanComponent;
  let fixture: ComponentFixture<CreateQualityPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQualityPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQualityPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
