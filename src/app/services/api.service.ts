import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // El mètode per extreure'ls tots haurà de cridar a la següent URL: https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302
  private _pokemon: Pokemon | null = null;
  private _allPokemon: Pokemon[] = [];
  private _error: boolean = false;

  constructor(private _http: HttpClient) {}

  retrievePokemon(id: number): void {
    // Mètode del service que serveix per retornar les dades d'un pokemon en base a la seva id
    this._error = false;

    const url = "https://pokeapi.co/api/v2/pokemon/" + id;
    this._http.get(url).subscribe({
      next: (value: any) => {
        this._pokemon = new Pokemon();
        this._pokemon.id = value.id;
        this._pokemon.name = value.name;
        this._pokemon.species = value.species.name;
        console.log(value.types.length);
        for (let i: number = 0; i < value.types.length; i++) {
          this._pokemon.types.push(value.types[i].type.name);
        }
        this._pokemon.height = value.height;
        this._pokemon.weight = value.weight;
        this._pokemon.imgURL = value.sprites.other.home.front_default;

        this._pokemon.hp = value.stats[0].base_stat;
        this._pokemon.attack = value.stats[1].base_stat;
        this._pokemon.defense = value.stats[2].base_stat;
        this._pokemon.specialAttack = value.stats[3].base_stat;
        this._pokemon.speed = value.stats[4].base_stat;
      },
      error: (error: any) => {
        this._pokemon = null;
        this._error = true;
      },
      complete: () => {}
    })

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

    /*// https://pokeapi.co/api/v2/evolution-chain/1/
    const url3 = "https://pokeapi.co/api/v2/evolution-chain/" + id;
    this._http.get(url3).subscribe({
      next: (value: any) => {
        this._pokemon = new Pokemon();
        this._pokemon.evolutionChain[0] = value.chain.species.name;
        this._pokemon.evolutionChain[1] = value.chain.evolves_to[0].species.name;
        this._pokemon.evolutionChain[2] = value.chain.evolves_to[0].evolves_to[0].species.name;

        let run: boolean = true;
        let j: number = 0;
        while (run) {
          let cadena_evolves_to = "";
          for (let k: number = 0; k < j+1; k++) {
            cadena_evolves_to += ".evolves_to[0]";
          }
          this._pokemon.evolutionChain[j] = value.chain + cadena_evolves_to
          j++;
        }

        //private _evolutionChain: string[]; // species // Les evolucions les treiem de: https://pokeapi.co/api/v2/evolution-chain/1/
      },
      error: (error: any) => {
        this._pokemon = null;
        this._error = true;
      },
      complete: () => {}
    })*/

  }

  retrieveAllPokemon () {
    this._error = false;

    const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302";
    this._http.get(url).subscribe({
      next: (value: any) => {

        for (let i: number = 1; i <= value.results.length; i++) {
          this.retrievePokemon(value.results[i].url);
          console.log(value.results[i].url);
          if (this._pokemon != null) {
            this._allPokemon.push(this._pokemon);
          }
        }
      },
      error: (error: any) => {
        this._pokemon = null;
        this._error = true;
      },
      complete: () => {}
    })
  }


  get pokemon(): Pokemon | null { return this._pokemon; }
  get allPokemon(): Pokemon[] {return this._allPokemon; }
  get hasError(): boolean { return this._error; }
}
