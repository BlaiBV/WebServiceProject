import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipusPage } from './tipus.page';

describe('TipusPage', () => {
  let component: TipusPage;
  let fixture: ComponentFixture<TipusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
