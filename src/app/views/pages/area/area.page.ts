import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/models/area';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.page.html',
  styleUrls: ['./area.page.scss'],
})
export class AreaPage {
  public region_name: string = "";
  public location_name: string = "";
  public base_url: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    // Obtenim els paràmetres de regió i localització
    
    this.route.params.subscribe(params => {
      let region: string = params['region'];
      let location: string = params['location'];
      this.region_name = region;
      this.location_name = location;
      this.base_url = "/regio/" + region + "/" + location;
      this.retrieveLocationAreas();
    });
  }

  retrieveLocationAreas() { this.pokemonservice.retrieveAreas(this.location_name); }
  get locationAreas(): Area[] { return this.pokemonservice.locationAreas}
}
