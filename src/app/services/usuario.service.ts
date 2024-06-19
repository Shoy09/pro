import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'https://dioses121.pythonanywhere.com/api';

  constructor(private http: HttpClient) { }

  actualizarImagenUsuario(dni: string, imagen: File, token: string): Observable<any> {
    const formData = new FormData();
    formData.append('imagen_usuario', imagen);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(`${this.baseUrl}/usuarios/actualizar/${dni}/`, formData, { headers }).pipe(
      catchError(error => {
        console.error('Error al actualizar la imagen del usuario:', error);
        return throwError(error);
      })
    );
  }

  actualizarUsuario(dni: string, datos: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.baseUrl}/usuarios/actualizar/${dni}/`, datos, { headers }).pipe(
      catchError(error => {
        console.error('Error al actualizar el usuario:', error);
        return throwError(error);
      })
    );
  }
}
