import { Component, OnInit } from '@angular/core';
import { Type } from 'src/app/models/type';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-tipus',
  templateUrl: './tipus.page.html',
  styleUrls: ['./tipus.page.scss'],
})
export class TipusPage /*implements OnInit*/ {

  constructor(private pokemonservice: PokemonService) { }

  //ngOnInit() {}

  retrievePokemon() { this.pokemonservice.retriveAllTypes(); }
  get allTypes(): Type[] { return this.pokemonservice.allTypes}

}
