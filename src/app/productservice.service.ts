import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>('https://fakestoreapi.com/products/categories')
      .pipe(
        catchError(this.handleError) 
      );
  }

  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`https://fakestoreapi.com/products/category/${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`https://fakestoreapi.com/products/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  searchProducts(searchTerm: string): Observable<any[]> {
    return this.http.get<any[]>('https://fakestoreapi.com/products')
      .pipe(
        map(products => products.filter(product => 
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        )),
        catchError(this.handleError)
      );
  }

  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
     
      errorMessage = `Server Error (${error.status}): ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}