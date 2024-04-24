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
  constructor(private pokemonservice: PokemonService) {
    //this.retrieveAllPokemon();
    
  }

  ngOnInit() {
    //this.generateItems();
    
  }

  doInfinite(infiniteScroll: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = this.cont; i < this.cont + 5; i++) {
        this.array.push( this.allPokemon[i] );
        this.cont++;
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  //retrieveAllPokemon() { this.pokemonservice.retrieveAllPokemon(); }

  /*private generateItems() {
    this.pokearray = this.allPokemon;
    console.log(this.pokearray[1]);
    const count = this.allPokemon.length + 1;
    for (let i = 0; i < 50; i++) {
      //console.log(this.allPokemon[i]);
      
    }
    
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }*/

  tipusColor(tipus: any): any {
    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }

  get allPokemon(): Atributs[] { return this.pokemonservice.allPokemon}
}
