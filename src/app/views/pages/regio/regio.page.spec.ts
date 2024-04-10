import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegioPage } from './regio.page';

describe('RegioPage', () => {
  let component: RegioPage;
  let fixture: ComponentFixture<RegioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
