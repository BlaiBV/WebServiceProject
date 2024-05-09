import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Atributs } from 'src/app/models/atributs';
import { Type } from 'src/app/models/type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tipus-pokemon',
  templateUrl: './tipus-pokemon.page.html',
  styleUrls: ['./tipus-pokemon.page.scss'],
})
export class TipusPokemonPage {
  public type_name: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    // Obtenim el paràmetre name de la ruta per saber el tipus concret al que s'accedeix

    this.route.params.subscribe(params => {
      let type: string = params['name'];
      this.type_name = type;
      this.retrieveTypePokemons();
    });
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon

    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black'};
  }


  retrieveTypePokemons() { this.pokemonservice.retrieveTypePokemons(this.type_name); }
  get typePokemons(): Atributs[] { return this.pokemonservice.typePokemons}
}
