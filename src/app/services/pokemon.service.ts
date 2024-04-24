import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { ApiService } from './api.service';
import { Minipokemon } from '../models/minipokemon';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Atributs } from '../models/atributs';
import { Type } from '../models/type';
import { Region } from '../models/region';
import { Area } from '../models/area';
import { RegionLocation } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _pokemon: Pokemon | null = null;
  private _allPokemon: Atributs[] = []; // Array de pokemons amb informació abreujada
  private _allTypes: Type[] = [];
  private _allRegion: Region[] = [];
  private _typePokemons: Atributs[] = [];
  private _regionLocations: RegionLocation[] = [];
  private _locationAreas: Area[] = [];
  private _areaPokemons: Atributs[] = [];
  private _error: boolean = false;
  public loading: any;
  
  constructor(private _apiServcie: ApiService, private loadingCtrl: LoadingController, private http: HttpClient) {
    this.retriveAllTypes();
    this.retriveAllRegion();
    this.retrieveAllPokemon();
   }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Estem buscant els pokèmons :)'
    });
    this.loading.present();
  }

  retrieveAllPokemon () {
    //this.showLoading();
    this._apiServcie.allPokemon.subscribe(
      (response: any) => {
        for (let index: number = 0; index < response.results.length; index++) {
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
        //this.loading.dismiss();
      }, (error) => {}
    );
  }

  retriveAllTypes () {
    this._apiServcie.allTypes.subscribe(
      (response: any) => {
        for (let index = 0; index < response.count; index++) {
          let value: any = response.results[index];
          this._allTypes.push({name: value.name, url: value.url});
        }
      }
    );
  }

  retriveAllRegion () {
    this._apiServcie.allRegion.subscribe(
      (response: any) => {
        for (let index = 0; index < response.count; index++) {
          let value: any = response.results[index];
          this._allRegion.push({name: value.name, url: value.url});
        }
      }
    );
  }

  retrievePokemon (id: number) {
    
    this._apiServcie.getPokemon(id).subscribe(
      (response: any) => {
        this._pokemon = new Pokemon();
        this._pokemon.id = response.id;
        this._pokemon.name = response.name;
        this._pokemon.species = response.species.name;
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
        this._pokemon.specialDefense = response.stats[4].base_stat;
        this._pokemon.speed = response.stats[4].base_stat;
        for (let i: number = 0; i < response.abilities.length; i++) {
          this._pokemon.abilities.push(response.abilities[i].ability.name);
        }
      }, (error) => {
        this._pokemon = null;
        this._error = true;
      }
    );

    this._apiServcie.getSpecie(id).subscribe(
      (response: any) => {
        if (this._pokemon != null) {
          this._pokemon.evolutionChain = response.evolution_chain.url;

          this._apiServcie.getEvolutions(this._pokemon.evolutionChain).subscribe(
            (response: any) => {
              if (this._pokemon != null) {
                this._pokemon.evolutions = [];


                if (response.chain.evolves_to[0] != null) {
                  this._pokemon.evolutions.push(parseInt(response.chain.species.url.split("/")[6]));

                  if (response.chain.evolves_to[0].evolves_to[0] != null) {
                    this._pokemon.evolutions.push(parseInt(response.chain.evolves_to[0].species.url.split("/")[6]));

                    if (response.chain.evolves_to[0].evolves_to[0].evolves_to[0] != null) {
                      this._pokemon.evolutions.push(parseInt(response.chain.evolves_to[0].evolves_to[0].species.url.split("/")[6]));
                    } else {
                      this._pokemon.evolutions.push(parseInt(response.chain.evolves_to[0].evolves_to[0].species.url.split("/")[6]));
                    }

                  } else {
                    this._pokemon.evolutions.push(parseInt(response.chain.evolves_to[0].species.url.split("/")[6]));
                  }

                } else {
                  this._pokemon.evolutions.push(parseInt(response.chain.species.url.split("/")[6]));
                }





                console.log(this._pokemon.evolutions);
              }
            }
          );
        }
      }, (error) => {
        this._pokemon = null;
        this._error = true;
      }
    );


  }

  retrieveTypePokemons(type_name: string) {
    let type_pokemons: Atributs[] = [];
    for (let index: number = 0; index < this._allPokemon.length; index++) {
      for (let j: number = 0; j < this._allPokemon[index].types.length; j++) {
        if (this._allPokemon[index].types[j].type.name == type_name) {
          type_pokemons.push(this._allPokemon[index]);
        }
      }
    }
    this._typePokemons = type_pokemons;
  }

  retrieveLocations (region: string) {
    this._regionLocations = [];
    let url: string = "";

    for (let i: number = 0; i < this._allRegion.length; i++) {
      if (this._allRegion[i].name == region) {
        url = this._allRegion[i].url;
      }
    }

    this._apiServcie.getLocations(url).subscribe(
      (response: any) => {
        for (let j: number = 0; j < response.locations.length; j++) {
          let value: RegionLocation = response.locations[j];
          this._regionLocations.push(value);
        }
      }
    );
  }

  retrieveAreas (location: string) {
    this._locationAreas = [];
    let url: string = "";

    for (let i: number = 0; i < this._regionLocations.length; i++) {
      if (this._regionLocations[i].name == location) {
        url = this._regionLocations[i].url;
      }
    }

    this._apiServcie.getAreas(url).subscribe(
      (response: any) => {
        for (let j: number = 0; j < response.areas.length; j++) {
          let value: Area = response.areas[j];
          this._locationAreas.push(value);
        }
      }
    );
  }


  retrieveAreaPokemons (area: string, location: string) {
    this._areaPokemons = [];
    
    let url: string = "";

    for (let i: number = 0; i < this._locationAreas.length; i++) {
      if (this._locationAreas[i].name == area) {
        url = this._locationAreas[i].url;
      }
    }

    this._apiServcie.getArea(url).subscribe(
      (response: any) => {

        let id_array: number[] = [];
        for (let j: number = 0; j < response.pokemon_encounters.length; j++) {
          id_array.push(parseInt(response.pokemon_encounters[j].pokemon.url.split("/")[6]));
        }

        this._areaPokemons = this._allPokemon.filter(pokemon => id_array.includes(pokemon.id));

      }
    );

  }

  get pokemon(): Pokemon | null { return this._pokemon; }
  get allPokemon(): Atributs[] {return this._allPokemon; }
  get allTypes(): Type[] {return this._allTypes; }
  get allRegion(): Region[] {return this._allRegion; }
  get typePokemons(): Atributs[] {return this._typePokemons; }
  get regionLocations(): RegionLocation[] {return this._regionLocations; }
  get locationAreas(): Area[] {return this._locationAreas; }
  get areaPokemons(): Atributs[] {return this._areaPokemons; }
  get hasError(): boolean { return this._error; }
}
