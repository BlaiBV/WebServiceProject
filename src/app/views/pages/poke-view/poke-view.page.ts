import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-view',
  templateUrl: './poke-view.page.html',
  styleUrls: ['./poke-view.page.scss'],
})
export class PokeViewPage {
  public pokemon_id: number = 0;

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let id: string = params['id'];
      this.pokemon_id = parseInt(id);
      console.log(this.pokemon_id);
      this.retrievePokemon();
    });
  }

  retrievePokemon() { this.pokemonservice.retrievePokemon(this.pokemon_id); }
  get pokemon(): Pokemon | null { return this.pokemonservice.pokemon}
  get hasError(): boolean { return this.pokemonservice.hasError; }
}
