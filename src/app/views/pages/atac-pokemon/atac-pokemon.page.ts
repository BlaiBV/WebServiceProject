import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-atac-pokemon',
  templateUrl: './atac-pokemon.page.html',
  styleUrls: ['./atac-pokemon.page.scss'],
})
export class AtacPokemonPage implements OnInit {

  constructor(private pokemonService: PokemonService) { 
    if(!this.allPokemonsCreated){
      this.pokemonService.retrieveAllPokemon();
    }
  }

  ngOnInit() {
  }
  get allPokemonsCreated():boolean {return this.pokemonService._allPokemonsCreated;}
}
