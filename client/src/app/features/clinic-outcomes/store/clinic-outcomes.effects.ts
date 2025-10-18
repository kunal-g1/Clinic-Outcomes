import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClinicOutcomesActions } from './clinic-outcomes.actions';
import { map, mergeMap, catchError, of } from 'rxjs';

@Injectable()
export class ClinicOutcomesEffects {
  private actions$ = inject(Actions);

  setPeriodLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.setReportingPeriod),
      map(({ period }) => ClinicOutcomesActions.loadOutcomes({ period }))
    )
  );

  loadOutcomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.loadOutcomes),
      mergeMap(({ period }) => {
        const now = new Date();
        return of(ClinicOutcomesActions.loadOutcomesSuccess({
          tir: null as any,
          gmi: null as any,
          activePatients: null as any,
          start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - (period - 1)),
          end: now,
          lastUpdated: now
        }));
      }),
      catchError(err =>
        of(ClinicOutcomesActions.loadOutcomesFailure({ error: String(err) }))
      )
    )
  );
}