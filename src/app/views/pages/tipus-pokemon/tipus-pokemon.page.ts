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
export class TipusPokemonPage /*implements OnInit*/ {
  public type_name: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let type: string = params['name'];
      this.type_name = type;
      this.retrieveTypePokemons();
    });
  }

  //ngOnInit() {}

  retrieveTypePokemons() { this.pokemonservice.retrieveTypePokemons(this.type_name); }
  get typePokemons(): Atributs[] { return this.pokemonservice.typePokemons}
}
