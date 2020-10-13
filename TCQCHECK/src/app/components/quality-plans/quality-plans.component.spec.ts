import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityPlansComponent } from './quality-plans.component';

describe('QualityPlansComponent', () => {
  let component: QualityPlansComponent;
  let fixture: ComponentFixture<QualityPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
