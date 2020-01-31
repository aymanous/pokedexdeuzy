import { PageData, Pokemon } from '../models/pokemon.model';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, forkJoin, timer } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiURL = "http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem("access_token")
    })
  };
  
  private selectedPokemonId = new BehaviorSubject(1);
  currentPokemonId = this.selectedPokemonId.asObservable();

  constructor(private http: HttpClient) { }

  changeSelectedPokemon(message: number) {
    this.selectedPokemonId.next(message)
  }

  getAllPokemons(offset=0, limit=20): Observable<PageData<Pokemon>>{
    return this.http.get<PageData<Pokemon>>(this.apiURL + "/pokemons?offset="+offset+"&limit="+limit)
    .pipe(
      catchError(this.handleError<PageData<Pokemon>>('getPokemons'))
    );
  }

  getMyTeamPokemons(): Observable<number[]>{
    return this.http.get<number[]>(this.apiURL + "/trainers/me/team", this.httpOptions)
    .pipe(
      catchError(this.handleError<number[]>('getMyTeamPokemons'))
    );
  }

  getPokemon(id): Observable<Pokemon>{
    return this.http.get<Pokemon>(this.apiURL + "/pokemons/"+id)
    .pipe(
      catchError(this.handleError<Pokemon>('getPokemon'))
    );
  }

  searchPokemon(keyword): Observable<PageData<Pokemon>>{
    return this.http.get<PageData<Pokemon>>(this.apiURL + "/pokemons?search="+keyword)
    .pipe(
      catchError(this.handleError<PageData<Pokemon>>('searchPokemon'))
    );
  }

  setMyTeamPokemons(pokemonsIds): Observable<any>{
    return this.http.put<string>(this.apiURL + "/trainers/me/team", pokemonsIds, this.httpOptions)
    .pipe(
      catchError(this.handleError('setMyTeamPokemons'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
