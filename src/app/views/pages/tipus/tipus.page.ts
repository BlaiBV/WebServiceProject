import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tipus',
  templateUrl: './tipus.page.html',
  styleUrls: ['./tipus.page.scss'],
})
export class TipusPage /*implements OnInit*/ {

  constructor(private pokemonService: PokemonService) { 
    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  //ngOnInit() {}

  retrievePokemon() { this.pokemonService.retriveAllTypes(); }
  get allTypes(): Type[] { return this.pokemonService.allTypes }
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
}
