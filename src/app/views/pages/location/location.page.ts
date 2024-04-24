import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegionLocation } from 'src/app/models/location';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage /*implements OnInit*/ {
  public region_name: string = "";
  public base_url: string = "";

  constructor(private pokemonservice: PokemonService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let region: string = params['region'];
      this.region_name = region;
      this.base_url = "/regio/" + region;
      console.log(this.region_name);
      this.retrieveRegionLocations();
    });
  }

  //ngOnInit() {}

  retrieveRegionLocations() { this.pokemonservice.retrieveLocations(this.region_name); }
  get regionLocations(): RegionLocation[] { return this.pokemonservice.regionLocations}
}
