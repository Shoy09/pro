import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImporteDetalle } from '../data/ImporteDetalle';

@Injectable({
  providedIn: 'root'
})
export class ImportacionService {
  private baseUrl = 'https://dioses121.pythonanywhere.com/api/importaciones';

  constructor(private http: HttpClient) { }

  fetchImportacionDetails(idcodigogeneral: string): Observable<ImporteDetalle[]> {
    return this.http.get<ImporteDetalle[]>(`${this.baseUrl}/${idcodigogeneral}/`).pipe(
      catchError(error => {
        console.error('Error al obtener detalles de importación:', error);
        return throwError(error);
      })
    );
  }
}