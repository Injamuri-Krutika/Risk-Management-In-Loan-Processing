import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IneligibleDialogueComponent } from './ineligible-dialogue.component';

describe('IneligibleDialogueComponent', () => {
  let component: IneligibleDialogueComponent;
  let fixture: ComponentFixture<IneligibleDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IneligibleDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IneligibleDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
