import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://dioses121.pythonanywhere.com/api';

  constructor(private http: HttpClient) { }

  login(dni: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/token/`, { dni, password }).pipe(
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        return throwError(error);
      })
    );
  }

  getCurrentUserData(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.baseUrl}/current-user/`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los datos del usuario actual:', error);
        return throwError(error);
      })
    );
  }
}
