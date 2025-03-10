import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    // Iniciar sesión
    { path: '', loadComponent: () => import('./features/auth/login/login.component') },

    // Registro
    { path: 'registrar', loadComponent: () => import('./features/auth/register/register.component') },

    // Panel
    {
        path: 'panel', canActivate: [AuthGuard], // Aplicar el guard aquí
        loadComponent: () => import('./features/dashboard/dashboard.component'), children: [
            { path: '', loadComponent: () => import('./features/dashboard/products/products.component') },

            // Pagina de productos
            { path: 'productos', loadComponent: () => import('./features/dashboard/products/products.component') },

            // Pagina de envios
            { path: 'envios', loadComponent: () => import('./features/dashboard/shipping/shipping.component') },
        ]
    },

    // Página de inicio
    { path: '**', loadComponent: () => import('./features/auth/login/login.component') },
];
