import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/region';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-regio',
  templateUrl: './regio.page.html',
  styleUrls: ['./regio.page.scss'],
})
export class RegioPage /*implements OnInit*/ {

  constructor(private pokemonservice: PokemonService) { }

  //ngOnInit() {}

  retrieveAllRegion() { this.pokemonservice.retriveAllRegion(); }
  get allRegion(): Region[] { return this.pokemonservice.allRegion}
}
