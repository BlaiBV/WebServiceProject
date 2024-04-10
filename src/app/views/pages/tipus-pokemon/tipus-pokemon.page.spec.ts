import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipusPokemonPage } from './tipus-pokemon.page';

describe('TipusPokemonPage', () => {
  let component: TipusPokemonPage;
  let fixture: ComponentFixture<TipusPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TipusPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
