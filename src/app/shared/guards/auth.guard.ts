import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private tokenService: TokenService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if (this.tokenService.isTokenExpired()) {
            // Si el token ha expirado o no existe, redirigir al login
            this.router.navigate(['/login']);
            return false;
        }

        // Rutas protegidas cuando el token es válido (login, register, etc.)


        // Si el token es válido, permite el acceso
        return true;
    }
}
