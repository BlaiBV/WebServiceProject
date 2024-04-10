import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokedex',
    loadChildren: () => import('./views/pages/pokedex/pokedex.module').then( m => m.PokedexPageModule)
  },
  {
    path: 'poke-view',
    loadChildren: () => import('./views/pages/poke-view/poke-view.module').then( m => m.PokeViewPageModule)
  },  {
    path: 'tipus-pokemon',
    loadChildren: () => import('./views/pages/tipus-pokemon/tipus-pokemon.module').then( m => m.TipusPokemonPageModule)
  },
  {
    path: 'atac-pokemon',
    loadChildren: () => import('./views/pages/atac-pokemon/atac-pokemon.module').then( m => m.AtacPokemonPageModule)
  },
  {
    path: 'regio',
    loadChildren: () => import('./views/pages/regio/regio.module').then( m => m.RegioPageModule)
  },
  {
    path: 'equip',
    loadChildren: () => import('./views/pages/equip/equip.module').then( m => m.EquipPageModule)
  },
  {
    path: 'page-not-found',
    loadChildren: () => import('./views/pages/page-not-found/page-not-found.module').then( m => m.PageNotFoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
