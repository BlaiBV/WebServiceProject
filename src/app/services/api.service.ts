import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Propietats per a l'Infinte Scroll
  public offset: number = 0;
  public num: number = -100;

  // URL's formatades per fer les crides
  public url_all: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302';
  public url_limit: string = 'https://pokeapi.co/api/v2/pokemon/?offset='+this.num+'&limit=100';
  public url_types: string = 'https://pokeapi.co/api/v2/type';
  private url_region: string = 'https://pokeapi.co/api/v2/region';
  public url_pokemon: string = 'https://pokeapi.co/api/v2/pokemon/';
  public url_specie: string = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {}

  get allPokemon(): Observable<any[]> {
    // Funció per fer crida a API per obtenir tots els pokemons
    return this.http.get<any[]>(this.url_all);
  }

  get allPokemonLimit(): Observable<any[]> {
    // Funció per fer crida a API per obtenir tots els pokemons amb limitació per Infinte Scroll
    this.num = this.num + 100;
    this.url_limit = 'https://pokeapi.co/api/v2/pokemon/?offset='+this.num+'&limit=100';
    console.log(this.url_limit);
    return this.http.get<any[]>(this.url_limit);
  }

  get allTypes(): Observable<any[]> {
    // Funció per fer crida a API per obtenir tots els tipus
    return this.http.get<any[]>(this.url_types);
  }

  get allRegion(): Observable<any[]> {
    // Funció per fer crida a API per obtenir totes les regions
    return this.http.get<any[]>(this.url_region);
  }

  getPokemon(id: number): Observable<any[]> {
    // Funció per fer crida a API per obtenir un pokemon concret
    return this.http.get<any[]>(this.url_pokemon + id +"/");
  }

  getSpecie(id: number): Observable<any> {
    // Funció per fer crida a API per obtenir una espècie en concret
    return this.http.get<any>(this.url_specie + id);
  }

  getEvolutions(url: string): Observable<any> {
    // Funció per fer crida a API per obtenir les evolucions d'un pokemon
    return this.http.get<any>(url);
  }

  getPokemonByUrl(url:string){
    // Funció per fer crida a API per obtenir un pokemon concret
    return this.http.get<any[]>(url);
  }


  getLocations(url: string) {
    // Funció per fer crida a API per obtenir totes les localitzacions d'una regió
    console.log(url);
    return this.http.get<any[]>(url);
  }

  getAreas(url: string) {
    // Funció per fer crida a API per obtenir totes les àrees d'una localització
    return this.http.get<any[]>(url);
  }

  getArea(url: string) {
    // Funció per fer crida a API per obtenir una àrea concreta
    return this.http.get<any[]>(url);
  }


}
