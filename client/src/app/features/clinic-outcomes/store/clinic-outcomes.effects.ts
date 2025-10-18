import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClinicOutcomesActions } from './clinic-outcomes.actions';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';
import { ClinicOutcomesService } from '../services/clinic-outcomes.service';
import { calcDateRange } from './date.utils';

@Injectable()
export class ClinicOutcomesEffects {
  private actions$ = inject(Actions);
  private api = inject(ClinicOutcomesService);

  /** When the period changes, request fresh data */
  setPeriodLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.setReportingPeriod),
      map(({ period }) => ClinicOutcomesActions.loadOutcomes({ period }))
    )
  );

  /** Call HTTP A (TIR), B (GMI), and active count in parallel */
  loadOutcomes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ClinicOutcomesActions.loadOutcomes),
      mergeMap(({ period }) => {
        const tir$ = this.api.getTimeInRange(period);
        const gmi$ = this.api.getGmi(period);
        const active$ = this.api.getActivePatients(period);
        const now = new Date();
        const { start, end } = calcDateRange(now, period);

        return forkJoin([tir$, gmi$, active$]).pipe(
          map(([tir, gmi, activePatients]) =>
            ClinicOutcomesActions.loadOutcomesSuccess({
              tir,
              gmi,
              activePatients,
              start,
              end,
              lastUpdated: now,
            })
          ),
          catchError((err) =>
            of(ClinicOutcomesActions.loadOutcomesFailure({ error: String(err) }))
          )
        );
      })
    )
  );
}
