import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { catchError, of } from 'rxjs';


@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule],
    providers: [AuthService, TokenService, HotToastService],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export default class LoginComponent {
    loginForm: FormGroup;

    loginError!: string;

    constructor(private fb: FormBuilder, private readonly authService: AuthService, private readonly tokenService: TokenService, private readonly router: Router, private readonly toast: HotToastService) {
        this.loginForm = this.fb.group({
            email: ['nicolas.rm540@gmail.com', [Validators.required, Validators.email]], // Validaciones de correo
            passwordHash: ['c267308bad', [Validators.required, Validators.minLength(6)]] // Validaciones de contraseña
        });
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            console.log('Formulario válido');
            const credentials = this.loginForm.value;

            this.authService.login(credentials).pipe(
                this.toast.observe({
                    loading: 'Iniciando sesión...',
                    success: (value) => {
                        if (value && value.token) {
                            this.tokenService.setToken(value.token);
                            window.location.href = '/panel';
                        }

                        return 'Inicio de sesión correcto';
                    },
                    error: (error: any) => {
                        return error.message || 'Error al iniciar sesión';
                    }
                }), catchError((error) => of(error))).subscribe({})

            // this.authService.login(credentials).subscribe({
            //     next: (response) => {
            //         if (response && response.token) {
            //             this.tokenService.setToken(response.token);
            //             this.router.navigate(['/panel']);
            //         }
            //     },
            //     error: (error) => {
            //         this.loginError = error.message;
            //     },
            //     complete: () => {
            //         console.log('Inicio de sesión completado');
            //     }
            // });

        } else {
            console.log('Formulario no válido');
        }
    }
}
