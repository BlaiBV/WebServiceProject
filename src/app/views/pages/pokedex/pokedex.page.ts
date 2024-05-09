import { Component, OnInit } from '@angular/core';
import { Minipokemon } from 'src/app/models/minipokemon';
import { Pokemon } from 'src/app/models/pokemon';
import { ApiService } from 'src/app/services/api.service';
import { PokemonService } from 'src/app/services/pokemon.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Atributs } from 'src/app/models/atributs';
@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage {

  public _search: string = '';
  public array: Atributs[] = [];
  public cont: number = 0;

  constructor(private pokemonService: PokemonService) {
  }

  doInfinite(ev: any) {
    // Funció dedicada a carregar més pokemons
    
    console.log('Begin async operation');
    this.pokemonService.retrievePokemonsLimit();

    setTimeout(() => {
      console.log("Infinite Scroll fent-se");
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon

    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }

  search(){
    // En cas que es faci clic sobre cerca, es carreguen tots els pokemon

    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  handleInput(event: any) {
    // Es va passant el text que s'introdueix al camp de cerca al service per filtrar els pokemons que es mostren

    this.pokemonService.filterPokemons(event);
  }

  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
  get allPokemon(): Atributs[] { return this.pokemonService.allPokemon}
}
