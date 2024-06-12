/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { User_ordersComponent } from './user_orders.component';

describe('User_ordersComponent', () => {
  let component: User_ordersComponent;
  let fixture: ComponentFixture<User_ordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ User_ordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(User_ordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
