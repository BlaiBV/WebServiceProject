import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeViewPage } from './poke-view.page';

describe('PokeViewPage', () => {
  let component: PokeViewPage;
  let fixture: ComponentFixture<PokeViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
