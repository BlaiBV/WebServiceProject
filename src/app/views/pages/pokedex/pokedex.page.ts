import { Component, OnInit } from '@angular/core';
import { Minipokemon } from 'src/app/models/minipokemon';
import { Pokemon } from 'src/app/models/pokemon';
import { ApiService } from 'src/app/services/api.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage {

  constructor(private pokemonservice: PokemonService) {
    this.retrieveAllPokemon();
  }

  retrieveAllPokemon() { this.pokemonservice.retrieveAllPokemon(); }

  get allPokemon(): Minipokemon[] { return this.pokemonservice.allPokemon}
}
