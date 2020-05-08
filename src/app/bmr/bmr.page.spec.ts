import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmrPage } from './bmr.page';

describe('BmrPage', () => {
  let component: BmrPage;
  let fixture: ComponentFixture<BmrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
