import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public num: number = 0;
  public url_all: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302';
  public url_types: string = 'https://pokeapi.co/api/v2/type';
  private url_region: string = 'https://pokeapi.co/api/v2/region';
  public url_pokemon: string = 'https://pokeapi.co/api/v2/pokemon/';
  public url_specie: string = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private http: HttpClient) {}

  get allPokemon(): Observable<any[]> {
    //Arreglar URL
    //Modificar offset
    this.num
    return this.http.get<any[]>(this.url_all);
  }

  get allTypes(): Observable<any[]> {
    return this.http.get<any[]>(this.url_types);
  }

  get allRegion(): Observable<any[]> {
    return this.http.get<any[]>(this.url_region);
  }

  getPokemon(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url_pokemon + id +"/");
  }

  getSpecie(id: number): Observable<any> {
    return this.http.get<any>(this.url_specie + id);
  }

  getEvolutions(url: string): Observable<any> {
    return this.http.get<any>(url);
  }




  getLocations(url: string) {
    console.log(url);
    return this.http.get<any[]>(url);
  }

  getAreas(url: string) {
    return this.http.get<any[]>(url);
  }

  getArea(url: string) {
    return this.http.get<any[]>(url);
  }


}
