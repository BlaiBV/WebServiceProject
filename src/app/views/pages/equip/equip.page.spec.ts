import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipPage } from './equip.page';

describe('EquipPage', () => {
  let component: EquipPage;
  let fixture: ComponentFixture<EquipPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
