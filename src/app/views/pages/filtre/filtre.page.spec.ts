import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltrePage } from './filtre.page';

describe('FiltrePage', () => {
  let component: FiltrePage;
  let fixture: ComponentFixture<FiltrePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
