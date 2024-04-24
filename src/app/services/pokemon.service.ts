import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { ApiService } from './api.service';
import { Minipokemon } from '../models/minipokemon';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Atributs } from '../models/atributs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _pokemon: Pokemon | null = null;
  private _allPokemon: Atributs[] = []; // Array de pokemons amb informació abreujada
  private _error: boolean = false;
  public loading: any;
  
  constructor(private _apiServcie: ApiService, private loadingCtrl: LoadingController, private http: HttpClient) {
    this.retrieveAllPokemon();
   }

  async showLoading() {
    console.log("Estic dins del showLoading abans de començar");
    
    this.loading = await this.loadingCtrl.create({
      message: 'Estem buscant els pokèmons :)'
    });
    console.log("Estic dins de la creació");
    this.loading.present();
    console.log("Després del present: ");
    
    console.log(this.loading);
    
  }

  async retrieveAllPokemon () {
   await this.showLoading();

    this._apiServcie.allPokemon.subscribe(
      (response: any) => {
        for (let index = 0; index < response.results.length; index++) {
          this.http.get<any[]>(response.results[index].url).subscribe({
            next: (value: any) => {
              this._allPokemon.push(value);
            },
            error: () =>{
              console.log("Error");
            },
            complete: () => {}
          });
        }
        console.log("Estic abans");
        if(this.loading){
          console.log("Estic dins");
          this.loading.dismiss();
        }
        console.log("Estic després");
        
        console.log(this._allPokemon);
      }, (error) => {}
    );
    console.log(this.loading);
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
  get allPokemon(): Atributs[] {return this._allPokemon; }
  get hasError(): boolean { return this._error; }
}
