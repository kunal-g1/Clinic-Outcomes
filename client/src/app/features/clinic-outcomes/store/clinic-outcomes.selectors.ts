import { createSelector } from '@ngrx/store';
import { selectClinicOutcomesState } from './clinic-outcomes.reducer';

export const selectPeriod = createSelector(
  selectClinicOutcomesState,
  s => s.period
);

export const selectDateRange = createSelector(
  selectClinicOutcomesState,
  s => ({ start: s.start, end: s.end })
);

export const selectLastUpdated = createSelector(
  selectClinicOutcomesState,
  s => s.lastUpdated
);

export const selectActivePatients = createSelector(
  selectClinicOutcomesState,
  s => s.activePatients
);

export const selectTimeInRange = createSelector(
  selectClinicOutcomesState,
  s => s.tir
);

export const selectGmi = createSelector(
  selectClinicOutcomesState,
  s => s.gmi
);

export const selectLoading = createSelector(
  selectClinicOutcomesState,
  s => s.loading
);

export const selectError = createSelector(
  selectClinicOutcomesState,
  s => s.error
);
