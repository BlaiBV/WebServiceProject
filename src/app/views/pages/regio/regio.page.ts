import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-regio',
  templateUrl: './regio.page.html',
  styleUrls: ['./regio.page.scss'],
})
export class RegioPage {

  constructor(private pokemonService: PokemonService) { 
    // En cas que tots els pokemons no estiguin carregats, es carreguen
    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  retrieveAllRegion() { this.pokemonService.retriveAllRegion(); }
  get allRegion(): Region[] { return this.pokemonService.allRegion}
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
}
