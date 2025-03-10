import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ProductEntity } from '../features/dashboard/products/products.component';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private readonly URL = 'http://localhost:4500/api/products';

    constructor(private readonly http: HttpClient) { }

    create(product: ProductEntity): Observable<ProductEntity> {
        return this.http.post<ProductEntity>(`${this.URL}/crear`, product)
            .pipe(catchError(this.handleError));
    }

    update(productId: string, product: ProductEntity): Observable<ProductEntity> {
        return this.http.put<ProductEntity>(`${this.URL}/actualizar/${productId}`, product)
            .pipe(catchError(this.handleError));
    }

    delete(productId: string): Observable<void> {
        console.log('Eliminando producto con ID:', productId);
        return this.http.delete<void>(`${this.URL}/eliminar/${productId}`)
            .pipe(catchError(this.handleError));
    }

    get(productId: string): Observable<ProductEntity> {
        return this.http.get<ProductEntity>(`${this.URL}/obtener/${productId}`)
            .pipe(catchError(this.handleError));
    }

    getAll(): Observable<ProductEntity[]> {
        return this.http.get<ProductEntity[]>(`${this.URL}/obtener`)
            .pipe(catchError(this.handleError));
    }

    getAllQuery(queryParams: any): Observable<ProductEntity[]> {
        const params = new HttpParams({ fromObject: queryParams });
        return this.http.get<ProductEntity[]>(`${this.URL}/obtener-query`, { params })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: any) {
        console.error('Ocurrió un error:', error);
        return throwError(() => new Error(error?.message || 'Algo salió mal, inténtelo más tarde.'));
    }
}
