import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.page.html',
  styleUrls: ['./filtre.page.scss'],
})
export class FiltrePage implements OnInit {

  constructor(private pokemonService: PokemonService) { 
    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  ngOnInit() {
  }
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
}
