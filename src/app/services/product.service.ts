import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/produtos';

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }
  /*
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
*/
  create(product: any): Observable<any> {
    //return this.http.post<any>(this.apiUrl, product);
    return this.http.post(`${this.apiUrl}`, product, { responseType: 'text' });
  }

  update(id: number, product: any): Observable<String> {
    //return this.http.put<any>(`${this.apiUrl}/update/${id}`, product);
    return this.http.put(`${this.apiUrl}/update/${id}`, product, { responseType: 'text' });
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
