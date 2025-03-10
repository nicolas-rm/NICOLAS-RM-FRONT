import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private readonly TOKEN_KEY = 'authToken';

    constructor() { }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) {
            return true;
        }
        const decodedToken = this.decodeToken(token);
        return decodedToken.exp < Date.now() / 1000;
    }

    private decodeToken(token: string): any {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }
}
