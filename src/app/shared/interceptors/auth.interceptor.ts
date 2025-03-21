import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service'; // Servicio para manejar el token

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        if (token) {
            const clonedRequest = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(clonedRequest);
        }

        return next.handle(req);
    }
}
