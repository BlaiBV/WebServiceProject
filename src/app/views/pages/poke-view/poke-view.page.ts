import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atributs } from 'src/app/models/atributs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-poke-view',
  templateUrl: './poke-view.page.html',
  styleUrls: ['./poke-view.page.scss'],
})
export class PokeViewPage {
  public pokemon_id: number = 0;
  public previous_id: number = 0;
  public next_id: number = 0;

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute, private router: Router) {
    // Obtenim els paràmetre d'id de la ruta

    this.route.params.subscribe(params => {
      let id: string = params['id'];
      this.pokemon_id = parseInt(id);

      if (this.pokemon_id == 1) { // En cas que sigui 1, el pokemon és també 1 == no es pot tirar més endarrera perquè és el primer
        this.previous_id = this.pokemon_id;
      } else if (this.pokemon_id == 10001) { // En cas que sigui 10001, el pokemon previ és el 1025. Està fet així l'ordre
        this.previous_id = 1025;
      } else { // En la resta de situacions el pokemon previ és l'anterior
        this.previous_id = this.pokemon_id - 1;
      }

      if (this.pokemon_id == 1025) { // En cas que sigui el pokemon 1025, el següent és 10001. Està fet així l'ordre
        this.next_id = 10001;
      } else if (this.pokemon_id == 10277) { // En cas que sigui el pokemon 10277, el següent és també el 10277 == no es pot tirar més endavant perquè és l'últim
        this.next_id = 10277;
      } else { // En la resta de situacions el pokemon següent és el de després
        this.next_id = this.pokemon_id + 1;
      }

      this.retrievePokemon();

    });
    
  }

  tipusColor(tipus: any): any {
    // Funció dedicada a establir el color de fons d'un element atenent el tipus del pokemon
    
    const color = tipus.type.name;
    return {'background': 'var(--ion-color-' + color + ')', 'color': 'black', 'font-size': 'x-small'};
  }

  retrievePokemon() { this.pokemonservice.retrievePokemon(this.pokemon_id); }
  get pokemon(): Pokemon | null { return this.pokemonservice.pokemon; }
  get hasError(): boolean { return this.pokemonservice.hasError; }
}
