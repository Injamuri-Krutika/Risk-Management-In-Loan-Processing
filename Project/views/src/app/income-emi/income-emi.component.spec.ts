import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeEmiComponent } from './income-emi.component';

describe('IncomeEmiComponent', () => {
  let component: IncomeEmiComponent;
  let fixture: ComponentFixture<IncomeEmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeEmiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeEmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
