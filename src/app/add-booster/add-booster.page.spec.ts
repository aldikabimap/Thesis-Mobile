import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoosterPage } from './add-booster.page';

describe('AddBoosterPage', () => {
  let component: AddBoosterPage;
  let fixture: ComponentFixture<AddBoosterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBoosterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
