import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-confirm-pokemon',
  templateUrl: './confirm-pokemon.page.html',
  styleUrls: ['./confirm-pokemon.page.scss'],
})
export class ConfirmPokemonPage {
  //public _pokemon: Pokemon | undefined;
  public barcode_url: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private pokemonservice: PokemonService) {
    this.route.params.subscribe(params => {
      this.barcode_url = decodeURIComponent(params['url']);
      this.retrievePokemon();
    });
  }

  acceptar() {
    this.router.navigate(['/equip'], {
      state: {
        accepted: true,
        pokemon: this.pokemon
      }
    });
  }

  denegar() {
    this.router.navigate(['/equip'], {
      state: {
        accepted: false,
        pokemon: null
      }
    });
  }

  retrievePokemon() { this.pokemonservice.retrievePokemon(parseInt(this.barcode_url.split("/")[6])); }
  get pokemon(): Pokemon | null { return this.pokemonservice.pokemon; }
}
