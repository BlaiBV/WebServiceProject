import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaPokemonPage } from './area-pokemon.page';

describe('AreaPokemonPage', () => {
  let component: AreaPokemonPage;
  let fixture: ComponentFixture<AreaPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
