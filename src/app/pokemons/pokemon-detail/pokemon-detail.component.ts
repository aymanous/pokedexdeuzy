import { Pokemon } from '../models/pokemon.model';
import { PokemonService } from './../services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private location : Location) { }

  pokemon : Pokemon
  selectedPokemonId : number;

  ngOnInit() {
    this.pokemonService.currentPokemonId.subscribe(id => this.getPokemon(id))
  }

  getPokemon(id){
    // const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe(res => this.pokemon = res)
  }

  playAudio(id){
    let audio = new Audio();
    audio.src = "assets/audio/"+id+".mp3";
    audio.load();
    audio.play();
  }

  goBack(){
    this.location.back();
  }
}
