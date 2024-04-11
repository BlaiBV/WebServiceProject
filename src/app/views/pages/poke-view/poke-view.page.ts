import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-poke-view',
  templateUrl: './poke-view.page.html',
  styleUrls: ['./poke-view.page.scss'],
})
export class PokeViewPage {
  public id: number = 1;

  constructor(private apiservice: ApiService) { }

  retrievePokemon() { this.apiservice.retrievePokemon(this.id); }
  get pokemon(): Pokemon | null { return this.apiservice.pokemon}
  get hasError(): boolean { return this.apiservice.hasError; }
}
