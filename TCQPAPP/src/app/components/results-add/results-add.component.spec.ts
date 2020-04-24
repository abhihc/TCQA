import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAddComponent } from './results-add.component';

describe('ResultsAddComponent', () => {
  let component: ResultsAddComponent;
  let fixture: ComponentFixture<ResultsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
