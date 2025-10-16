import { Routes } from '@angular/router';
import { ClinicOutcomesPage } from './features/clinic-outcomes/containers/clinic-outcomes-page/clinic-outcomes-page'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clinic-outcomes' },
  {
    path: 'clinic-outcomes',
    loadComponent: () => ClinicOutcomesPage
  },
  { path: '**', redirectTo: 'clinic-outcomes' }
];
