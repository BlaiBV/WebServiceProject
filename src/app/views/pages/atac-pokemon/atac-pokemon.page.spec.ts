import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtacPokemonPage } from './atac-pokemon.page';

describe('AtacPokemonPage', () => {
  let component: AtacPokemonPage;
  let fixture: ComponentFixture<AtacPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtacPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
