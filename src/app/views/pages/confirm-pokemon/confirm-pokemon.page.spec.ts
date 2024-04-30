import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmPokemonPage } from './confirm-pokemon.page';

describe('ConfirmPokemonPage', () => {
  let component: ConfirmPokemonPage;
  let fixture: ComponentFixture<ConfirmPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
