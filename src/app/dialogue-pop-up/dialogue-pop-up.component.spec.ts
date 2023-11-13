import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoguePopUpComponent } from './dialogue-pop-up.component';

describe('DialoguePopUpComponent', () => {
  let component: DialoguePopUpComponent;
  let fixture: ComponentFixture<DialoguePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialoguePopUpComponent]
    });
    fixture = TestBed.createComponent(DialoguePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
