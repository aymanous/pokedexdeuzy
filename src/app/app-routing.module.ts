import { GuardsService } from './authentication/services/guards.service';
import { LoginComponent } from './authentication/login/login.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './pokemons/teams/teams.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuardsService]},
  { path: 'pokedex', component: PokedexComponent, canActivate: [GuardsService] },
  { path: 'myteam', component: TeamsComponent, canActivate: [GuardsService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
