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
export class PokedexPage implements OnInit {
  public _search: string = '';
  public array: Atributs[] = [];
  public cont: number = 0;
  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit() {}

  doInfinite(ev: any) {
    console.log('Begin async operation');
    this.pokemonService.retrievePokemonsLimit();

    setTimeout(() => {
      console.log("Infinite Scroll fent-se");
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  tipusColor(tipus: any): any {
    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }

  search(){
    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  handleInput(event: any) {
    this.pokemonService.filterPokemons(event);
  }

  restart(){
    
  }
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
  get allPokemon(): Atributs[] { return this.pokemonService.allPokemon}
}
