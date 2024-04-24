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
  public previous_id: number = 0;
  public next_id: number = 0;

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let id: string = params['id'];
      this.pokemon_id = parseInt(id);

      if (this.pokemon_id == 1) {
        this.previous_id = this.pokemon_id;
      } else if (this.pokemon_id == 10001) {
        this.previous_id = 1025;
      } else {
        this.previous_id = this.pokemon_id - 1;
      }

      if (this.pokemon_id == 1025) {
        this.next_id = 10001;
      } else if (this.pokemon_id == 10277) {
        this.next_id = 10277;
      } else {
        this.next_id = this.pokemon_id + 1;
      }



      this.retrievePokemon();
    });
  }

  retrievePokemon() { this.pokemonservice.retrievePokemon(this.pokemon_id); }
  get pokemon(): Pokemon | null { return this.pokemonservice.pokemon; }
  get hasError(): boolean { return this.pokemonservice.hasError; }
}
