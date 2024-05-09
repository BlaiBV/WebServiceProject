import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionLocation } from 'src/app/models/location';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage {
  public region_name: string = "";
  public base_url: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    // Obtenim els paràmetres de la ruta i es demana al service que retorni les localitzacions de la regió

    this.route.params.subscribe(params => {
      let region: string = params['region'];
      this.region_name = region;
      this.base_url = "/regio/" + region;
      this.retrieveRegionLocations();
    });
  }

  retrieveRegionLocations() { this.pokemonservice.retrieveLocations(this.region_name); }
  get regionLocations(): RegionLocation[] { return this.pokemonservice.regionLocations}
}
