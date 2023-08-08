import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {

  private apiUrl = 'https://api.thecatapi.com/v1';

  private key = 'live_IRqqNsZqXChNioPD82ir8u3D6RHdGRVT2riStU5zuSVCjPcFerNCV700Z2sdtugc';

  constructor(private http: HttpClient) { }

  getCatImages(breedIds: string, limit: number): Observable<any> {
    const params = {
      breed_ids: breedIds ? breedIds : '',
      limit: limit.toString(),
      api_key: this.key,
    };
    return this.http.get<any[]>(`${this.apiUrl}/images/search`, { params });
  }

  getBreeds(): Observable<any[]> {
    return this.http.get<any[]>(`https://api.thecatapi.com/v1/breeds`);
  }
}
