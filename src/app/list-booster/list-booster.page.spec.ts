import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoosterPage } from './list-booster.page';

describe('ListBoosterPage', () => {
  let component: ListBoosterPage;
  let fixture: ComponentFixture<ListBoosterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBoosterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBoosterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
