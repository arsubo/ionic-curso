import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadLines } from '../interfaces/intefaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = apiUrl + query;
    return this.http.get<T>(query, { headers });
  }

  getTopHeadLines() {
    this.headLinesPage++;
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
    // return this.http.get<RespuestaTopHeadLines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=fbcd59254f6046cd9cccc85a1c2f6ff0`);
  }

  getTopHeadLineCategoria(categoria: string) {

    if (this.categoriaActual === categoria) {
      this.categoriaPage++;

    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);

    //     return this.http.get(`
    // https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fbcd59254f6046cd9cccc85a1c2f6ff0`);
  }
}
