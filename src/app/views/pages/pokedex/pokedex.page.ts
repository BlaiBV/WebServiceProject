import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage {

  constructor(private apiservice: ApiService) {
    this.retrieveAllPokemon();
  }

  retrieveAllPokemon() { this.apiservice.retrieveAllPokemon(); }

  get allPokemon(): Pokemon[] { return this.apiservice.allPokemon}
}
