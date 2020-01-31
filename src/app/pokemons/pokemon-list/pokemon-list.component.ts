import { PokemonService } from './../services/pokemon.service';
import { Pokemon, PageData } from '../models/pokemon.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent implements OnInit {
  searchValue = '';
  pageData : PageData<Pokemon>
  selectedPokemonId : number

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.currentPokemonId.subscribe(message => this.selectedPokemonId = message);
    this.getPokemons();
  }

  getPokemons(){
    this.pokemonService.getAllPokemons().subscribe(res => this.pageData = res);
  }

  onScroll(){
    this.pokemonService.getAllPokemons(this.pageData.offset+10, 10).subscribe(res => {
      for (var i = 0; i < res.data.length; i++) {
        this.pageData.data.push(res.data[i]);
      }
      this.pageData.offset += 10;
    });
  }

  searchPokemon() {
    if(this.searchValue.length > 0) this.pokemonService.searchPokemon(this.searchValue).subscribe(res => this.pageData = res);
    else this.getPokemons()
  }

  selectPokemon(id){
    this.pokemonService.changeSelectedPokemon(id)
  }
}
