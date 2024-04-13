import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { ApiService } from './api.service';
import { Minipokemon } from '../models/minipokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _pokemon: Pokemon | null = null;
  private _allPokemon: Minipokemon[] = []; // Array de pokemons amb informació abreujada
  private _error: boolean = false;
  
  constructor(private _apiServcie: ApiService) { }

  retrieveAllPokemon () {
    this._apiServcie.allPokemon.subscribe(
      (response: any) => {
        for (let i: number = 0; i < response.results.length; i++) {
          // Construïm un minipokemon per elements de la llista results
          let mini: Minipokemon = new Minipokemon;
          mini.url = response.results[i].url;
          mini.name = response.results[i].name;

          // Extraíem la id del pokemon de la id
          let url_array = mini.url.split('/');
          mini.id = parseInt(url_array[url_array.length-2]);

          // Muntem la url de la imatge amb la id
          mini.imgURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/' + mini.id + '.png';

          this._allPokemon.push(mini); // Afegim a l'array de pokemons
        }
      }, (error) => {}
    );
  }

  retrievePokemon (id: number) {
    console.log("hola");
    this._apiServcie.getPokemon(id).subscribe(
      (response: any) => {
        this._pokemon = new Pokemon();
        this._pokemon.id = response.id;
        this._pokemon.name = response.name;
        this._pokemon.species = response.species.name;
        console.log(response.types.length);
        for (let i: number = 0; i < response.types.length; i++) {
          this._pokemon.types.push(response.types[i].type.name);
        }
        this._pokemon.height = response.height;
        this._pokemon.weight = response.weight;
        this._pokemon.imgURL = response.sprites.other.home.front_default;

        this._pokemon.hp = response.stats[0].base_stat;
        this._pokemon.attack = response.stats[1].base_stat;
        this._pokemon.defense = response.stats[2].base_stat;
        this._pokemon.specialAttack = response.stats[3].base_stat;
        this._pokemon.speed = response.stats[4].base_stat;
        console.log(this._pokemon);
      }, (error) => {
        this._pokemon = null;
        this._error = true;
      }
    );
  }


  /*const url2 = "https://pokeapi.co/api/v2/pokemon-species/" + id;
  this._http.get(url2).subscribe({
    next: (value: any) => {
      this._pokemon.captureRate = value.capture_rate;
      //private _evolutionChain: string[]; // species // Les evolucions les treiem de: https://pokeapi.co/api/v2/evolution-chain/1/
    },
    error: (error: any) => {
      this._pokemon = null;
      this._error = true;
    },
    complete: () => {}
  })*/

  get pokemon(): Pokemon | null { return this._pokemon; }
  get allPokemon(): Minipokemon[] {return this._allPokemon; }
  get hasError(): boolean { return this._error; }
}
