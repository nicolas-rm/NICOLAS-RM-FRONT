import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly URL = 'http://localhost:4500/api/auth'

    constructor(private readonly http: HttpClient, private readonly tokenService: TokenService) { }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.URL}/iniciar-sesion`, credentials).pipe(
            catchError(this.handleError)
        );
    }

    register(user: any): Observable<any> {
        return this.http.post(`${this.URL}/registrar`, user).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any) {
        // Revisar la estructura del error
        // console.error('Error:', error);

        // Extraer el mensaje de error correctamente
        let errorMessage = 'Error desconocido';
        if (error?.error?.error) {
            errorMessage = error.error.error;  // El mensaje está dentro de `error.error.error`
        } else if (error?.message) {
            errorMessage = error.message;
        }

        return throwError(() => new Error(errorMessage));
    }
}
