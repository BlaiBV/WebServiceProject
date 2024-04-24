import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public offset: number = 0;
  public url_all: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302';
  public url_pokemon: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  get allPokemon(): Observable<any[]> {
    //Arreglar URL
    //Modificar offset
    this.offset
    return this.http.get<any[]>(this.url_all);
  }

  getPokemon(id: number): Observable<any[]> {
    return this.http.get<any[]>(this.url_pokemon + id +"/");
  }


}
