import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  searchValue = '';
  myTeamPokemons:Pokemon[];
  searchResultsPokemons:Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.initMyPokemons();
  }

  initMyPokemons() {
    this.pokemonService.getMyTeamPokemons().subscribe(res => {
      const pokemons = [];
      res.forEach(id => {
        pokemons.push(this.pokemonService.getPokemon(id));
      });
      if(res.length == 0) {
        this.myTeamPokemons = [];
        return;
      }
        forkJoin(pokemons).subscribe(result => {
          this.myTeamPokemons = result;
        });
    });
  }

  delete(id){
    let pokemonsIds: number[] = [];
    if(this.myTeamPokemons.length > 1){
      for(let elt of this.myTeamPokemons){
        pokemonsIds.push(elt.id);
      }

      let i = 0;
      for(let cid of pokemonsIds){
        if(cid == id){
          pokemonsIds.splice(i, 1);
          break;
        }
        i++;
      }
    }

    this.pokemonService.setMyTeamPokemons(pokemonsIds).subscribe(res => {
      this.initMyPokemons();
    });
  }

  searchPokemon(){
    console.log("d");
    if(this.searchValue.length > 0) this.pokemonService.searchPokemon(this.searchValue).subscribe(res => {
        this.searchResultsPokemons = res.data
      });
    else this.searchResultsPokemons = [];
  }

  addPokemon(id){
    let pokemonsIds : number[] = [id];
    this.myTeamPokemons.forEach(elt => {
      pokemonsIds.push(elt.id);
    });
    this.pokemonService.setMyTeamPokemons(pokemonsIds).subscribe(res => {
      this.initMyPokemons();      
    });
  }
}
