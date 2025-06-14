import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'http://localhost:8080/estoque';

  constructor(private http: HttpClient) {}

  checkStock(id: number): Observable<string> {
    if (!id) {
      throw new Error('ID do produto não pode ser vazio');
    }
    
    return this.http.get(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
}
