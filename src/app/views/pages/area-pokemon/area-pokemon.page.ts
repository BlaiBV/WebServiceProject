import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Atributs } from 'src/app/models/atributs';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-area-pokemon',
  templateUrl: './area-pokemon.page.html',
  styleUrls: ['./area-pokemon.page.scss'],
})
export class AreaPokemonPage {
  public region_name: string = "";
  public location_name: string = "";
  public area_name: string = "";
  public base_url: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    // Obtenim els paràmetres de regió, localització i àrea

    this.route.params.subscribe(params => {
      let region: string = params['region'];
      let location: string = params['location'];
      let area: string = params['area'];
      this.region_name = region;
      this.location_name = location;
      this.area_name = area;
      this.retrieveAreaPokemons();
    });
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon

    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }

  retrieveAreaPokemons() { this.pokemonservice.retrieveAreaPokemons(this.area_name, this.location_name); }
  get areaPokemons(): Atributs[] { return this.pokemonservice.areaPokemons}
}
