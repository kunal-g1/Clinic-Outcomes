import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { clinicOutcomesFeature, clinicOutcomesReducer } from './features/clinic-outcomes/store/clinic-outcomes.reducer';
import { ClinicOutcomesEffects } from './features/clinic-outcomes/store/clinic-outcomes.effects';
import { ClinicOutcomesPage } from './features/clinic-outcomes/containers/clinic-outcomes-page/clinic-outcomes-page'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clinic-outcomes' },
  { path: 'clinic-outcomes', 
    providers: [
      provideState(clinicOutcomesFeature.name, clinicOutcomesReducer),
      provideEffects(ClinicOutcomesEffects),
    ],
    component: ClinicOutcomesPage },
  { path: '**', redirectTo: 'clinic-outcomes' }
];
