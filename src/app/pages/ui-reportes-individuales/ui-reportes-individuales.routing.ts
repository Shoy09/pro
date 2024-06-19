import { Routes } from '@angular/router';

// ui
import { AppReporteIndividualComponent } from './reporte-individual/reporte-individual.component';


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Evaluacion-individual',
        component: AppReporteIndividualComponent,
      },
    ],
  },
];
