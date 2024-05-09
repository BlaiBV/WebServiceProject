import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tipus',
  templateUrl: './tipus.page.html',
  styleUrls: ['./tipus.page.scss'],
})
export class TipusPage {

  constructor(private pokemonService: PokemonService) { 
    // En cas que tots els pokemons no estiguin carregats, es carreguen

    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon
    
    const color = tipus;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }

  retrievePokemon() { this.pokemonService.retriveAllTypes(); }
  get allTypes(): Type[] { return this.pokemonService.allTypes }
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
}
