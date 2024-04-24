import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home',loadChildren: () => import('./views/pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'pokedex',loadChildren: () => import('./views/pages/pokedex/pokedex.module').then( m => m.PokedexPageModule)},
  {path: 'poke-view/:id',loadChildren: () => import('./views/pages/poke-view/poke-view.module').then( m => m.PokeViewPageModule)},
  {path: 'tipus', loadChildren: () => import('./views/pages/tipus/tipus.module').then( m => m.TipusPageModule)},
  {path: 'tipus/:name',loadChildren: () => import('./views/pages/tipus-pokemon/tipus-pokemon.module').then( m => m.TipusPokemonPageModule)},
  {path: 'atac-pokemon',loadChildren: () => import('./views/pages/atac-pokemon/atac-pokemon.module').then( m => m.AtacPokemonPageModule)},
  {path: 'regio/:region/:location/:area', loadChildren: () => import('./views/pages/area-pokemon/area-pokemon.module').then( m => m.AreaPokemonPageModule)},
  {path: 'regio/:region/:location', loadChildren: () => import('./views/pages/area/area.module').then( m => m.AreaPageModule)},
  {path: 'regio/:region', loadChildren: () => import('./views/pages/location/location.module').then( m => m.LocationPageModule)},
  {path: 'regio',loadChildren: () => import('./views/pages/regio/regio.module').then( m => m.RegioPageModule)},
  {path: 'equip',loadChildren: () => import('./views/pages/equip/equip.module').then( m => m.EquipPageModule)},
  {path: 'filtre',loadChildren: () => import('./views/pages/filtre/filtre.module').then( m => m.FiltrePageModule)},
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: '**',loadChildren: () => import('./views/pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)},
  {path: 'barcode-scanner',loadChildren: () => import('./views/pages/barcode-scanner/barcode-scanner.module').then( m => m.BarcodeScannerPageModule)},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
