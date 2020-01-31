import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { MatListModule, MatCardModule, MatGridListModule } from "@angular/material";
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { TeamsComponent } from './teams/teams.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [PokemonListComponent, PokemonDetailComponent, PokedexComponent, TeamsComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    InfiniteScrollModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule
  ]
})
export class PokemonsModule { }
