import { AuthService } from './../../../services/auth.service';
import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent implements OnInit {
  dni: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    this.authService.login(this.dni, this.password).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);

        const token = response.access;
        sessionStorage.setItem('token', token);

        this.getCurrentUserData(token);

        this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
      },
      error => {
        if (error.status === 401) {
          this.toastr.error('Credenciales inválidas. Por favor, inténtalo de nuevo.', 'Error de inicio de sesión');
        } else {
          console.error('Error al iniciar sesión:', error);
          this.toastr.error(`Error al iniciar sesión: ${error.message}`, 'Error de inicio de sesión');
        }
      }
    );
  }

  getCurrentUserData(token: string) {
    this.authService.getCurrentUserData(token).subscribe(
      userData => {
        console.log('JSON de los datos del usuario actual:', JSON.stringify(userData, null, 2));

        sessionStorage.setItem('dni', userData.dni);
        sessionStorage.setItem('apel_nomb', userData.apel_nomb);
        sessionStorage.setItem('tipo_usuarioapp', userData.tipo_usuarioapp);
        sessionStorage.setItem('imagen_usuario', userData.imagen_usuario);
        sessionStorage.setItem('descripcion', userData.descripcion);
        sessionStorage.setItem('fecha_nacimiento', userData.fecha_nacimiento);
        sessionStorage.setItem('telefono', userData.telefono);
        sessionStorage.setItem('gmail', userData.gmail);

        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Error al obtener los datos del usuario actual:', error);
      }
    );
  }
}
