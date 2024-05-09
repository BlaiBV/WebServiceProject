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

  private _pokemon: Pokemon | null = null; // Variable per emmagatzemar la infromació d'un pokemon
  private _allPokemon: Atributs[] = []; // Array de pokemons amb informació abreujada
  private _unfilteredPokemons: Atributs[] = []; // Es guarden temporalment pokemons sense filtrar
  private _allTypes: Type[] = []; // Es guarden tots els tipus
  private _allRegion: Region[] = []; // Es guarden totes les regions
  private _typePokemons: Atributs[] = []; // Es carreguen els pokemons del tipus seleccionat
  private _regionLocations: RegionLocation[] = []; // Es carreguen les localitzacions de la regió seleccionada
  private _locationAreas: Area[] = []; // Es carreguen les àrees de la localització seleccionada
  private _areaPokemons: Atributs[] = []; // Es carreguen els pokemons de l'àrea seleccionada
  private _error: boolean = false; // Es guarda si hi ha un error
  public loading: any;
  public _allPokemonsCreated: boolean = false;
  public _filtratge: number = 0;
  public _pokemonTeam: Atributs[] =[]; // Es carreguen els pokemons de l'equip
  public sixPokemons: boolean = false;

  constructor(private _apiService: ApiService, private loadingCtrl: LoadingController, private http: HttpClient) {
    this.retriveAllTypes(); // S'obtenen tots els tipus
    this.retriveAllRegion(); // S'obtenen totes les sessions
    this.retrievePokemonsLimit(); // Es carreguen els pokemons limitats, el primer paquet de 100
  }

  async showLoading() {
    // Funció dedicada a mostrar que s'estan carregant tots els pokemons
    
    this.loading = await this.loadingCtrl.create({
      message: 'Estem buscant els pokèmons :)'
    });
    this.loading.present();
    console.log("Després del present: ");
    
    console.log(this.loading);
    
  }

  async retrieveAllPokemon() {
    // Funció dedicada a retornar tots els pokemon

    this._allPokemon = [];
    this._allPokemonsCreated = true;
    await this.showLoading();
    this._apiService.allPokemon.subscribe({
      next: async (response: any) => {
        await this.showLoading();
        for (let index: number = 0; index < response.results.length; index++) {
          this.http.get<any[]>(response.results[index].url).subscribe({
            next: (value: any) => {
              this._allPokemon.push(value);
            },
            error: () => {
              console.log("Error");
            },
            complete: () => { 
              
              this.loading.dismiss();
            }
          });
        }
        
      },
      error: () => { },
      complete: () => {
        this.loading.dismiss();
       }
    });
  }

  retrievePokemonsLimit(){
    // Funció dedicada a tornar tots els pokemons de forma limitada, per paquets de 100
    this._apiService.allPokemonLimit.subscribe({
      next: (response: any) => {
        for (let index: number = 0; index < response.results.length; index++) {
          this.http.get<any[]>(response.results[index].url).subscribe({
            next: (value: any) => {
              this._allPokemon.push(value);
            },
            error: () => {
              console.log("Error");
            },
            complete: () => { }
          });
        }
      },
      error: () => {},
      complete: () => {}
    });
  }

  retriveAllTypes() {
    // Funció dedicada a retornar tots els tipus de pokemon
    this._apiService.allTypes.subscribe(
      (response: any) => {
        for (let index = 0; index < response.count; index++) {
          let value: any = response.results[index];
          this._allTypes.push({ name: value.name, url: value.url });
        }
      }
    );
    console.log(this.loading);
  }

  retriveAllRegion() {
    // Funció dedicada a retornar totes les regions
    this._apiService.allRegion.subscribe(
      (response: any) => {
        for (let index = 0; index < response.count; index++) {
          let value: any = response.results[index];
          this._allRegion.push({ name: value.name, url: value.url });
        }
      }
    );
  }

  retrievePokemon(id: number) {
    // Funció dedicada a retorna un pokemon concret

    // Es fa una primera crida a API amb el service per tal d'obtenir la major part d'atributs del pokemon
    this._apiService.getPokemon(id).subscribe(
      (response: any) => {
        this._pokemon = new Pokemon(); // S'instancia un nou pokemon
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

    // Es fa una segona crida a API per obtenir la URL de l'evolució del pokemon (ja que no es construeix a partir de la id del pokemon, com les imatges)
    this._apiService.getSpecie(id).subscribe(
      (response: any) => {
        if (this._pokemon != null) {
          this._pokemon.evolutionChain = response.evolution_chain.url;

          // Es fa una tercera crida a API per obtenir les evolucions concretes
          this._apiService.getEvolutions(this._pokemon.evolutionChain).subscribe(
            (response: any) => {
              if (this._pokemon != null) {
                this._pokemon.evolutions = [];

                // Es va accedint a cada evolució si n'hi ha una següent (es baixa a 3 nivells)
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
    // Funció dedicada a retornar els pokemons d'un tipus específic
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

  retrieveLocations(region: string) {
    // Funció dedicada a retornar les localitzacions d'una regió específica
    this._regionLocations = [];
    let url: string = "";

    for (let i: number = 0; i < this._allRegion.length; i++) {
      if (this._allRegion[i].name == region) {
        url = this._allRegion[i].url;
      }
    }

    this._apiService.getLocations(url).subscribe(
      (response: any) => {
        for (let j: number = 0; j < response.locations.length; j++) {
          let value: RegionLocation = response.locations[j];
          this._regionLocations.push(value);
        }
      }
    );
  }

  retrieveAreas(location: string) {
    // Funció dedicada a retornar les àrees d'una localització específica
    this._locationAreas = [];
    let url: string = "";

    for (let i: number = 0; i < this._regionLocations.length; i++) {
      if (this._regionLocations[i].name == location) {
        url = this._regionLocations[i].url;
      }
    }

    this._apiService.getAreas(url).subscribe(
      (response: any) => {
        for (let j: number = 0; j < response.areas.length; j++) {
          let value: Area = response.areas[j];
          this._locationAreas.push(value);
        }
      }
    );
  }


  retrieveAreaPokemons(area: string, location: string) {
    // Funció dedicada a retornar els pokemons d'una àrea específica
    this._areaPokemons = [];

    let url: string = "";

    for (let i: number = 0; i < this._locationAreas.length; i++) {
      if (this._locationAreas[i].name == area) {
        url = this._locationAreas[i].url;
      }
    }

    this._apiService.getArea(url).subscribe(
      (response: any) => {

        let id_array: number[] = [];
        for (let j: number = 0; j < response.pokemon_encounters.length; j++) {
          id_array.push(parseInt(response.pokemon_encounters[j].pokemon.url.split("/")[6]));
        }

        this._areaPokemons = this._allPokemon.filter(pokemon => id_array.includes(pokemon.id));

      }
    );

  }

  filterPokemons(event: any){
    // Funció dedicada a filtrar els pokemons
    this._filtratge++;

    const query = event.target.value.toLowerCase();
    console.log(query);

    // En cas que el filtratge estigui activat per primer cop, es guarden els pokemons sense filtrar
    if (this._filtratge == 1) {
      this._unfilteredPokemons= this._allPokemon;
    }

    this._allPokemon = this._allPokemon.filter(p => p.name.toLowerCase().includes(query)); // Es filtren els pokemons per nom

    // En cas que el contingut del camp de text estigui buit, es recupera l'array sense filtrar, es buida el temporal i es retorna la variable de filtratge a zero
    if (event.target.value == "") {
      this._allPokemon = this._unfilteredPokemons;
      this._unfilteredPokemons = [];
      this._filtratge = 0;
    }
  }

  retrievePokemonByUrl(pokemons: any[]){ 
    // Funció dedicada a retornar un pokemon concret per URL

    this._pokemonTeam = [];
    for (let index = 0; index < pokemons.length; index++) {
      this._apiService.getPokemonByUrl(pokemons[index]).subscribe({
        next: (response: any) => {
          this._pokemonTeam.push(response);
        },
        error: () => {},
        complete: () => {}
      });
    }
  }

  // Getters dels diferents objectes i arrays
  get pokemon(): Pokemon | null { return this._pokemon; }
  get allPokemon(): Atributs[] { return this._allPokemon; }
  get allTypes(): Type[] { return this._allTypes; }
  get allRegion(): Region[] { return this._allRegion; }
  get typePokemons(): Atributs[] { return this._typePokemons; }
  get regionLocations(): RegionLocation[] { return this._regionLocations; }
  get locationAreas(): Area[] { return this._locationAreas; }
  get areaPokemons(): Atributs[] { return this._areaPokemons; }
  get hasError(): boolean { return this._error; }
  get allPokemonsCreated():boolean {return this._allPokemonsCreated;}
  get pokemonTeam(): Atributs[]{return this._pokemonTeam; }
  get isSixPokemons(): boolean { return this.sixPokemons; }
}
