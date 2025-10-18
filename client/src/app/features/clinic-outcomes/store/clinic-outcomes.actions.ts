import { createActionGroup, props } from '@ngrx/store';
import { ReportingPeriod } from '../models/reporting-period.type';
import { TimeInRange } from '../models/tir.model';
import { Gmi } from '../models/gmi.model';

export const ClinicOutcomesActions = createActionGroup({
  source: 'ClinicOutcomes',
  events: {
    'Set Reporting Period': props<{ period: ReportingPeriod }>(),
    'Load Outcomes': props<{ period: ReportingPeriod }>(),
    'Load Outcomes Success': props<{
      tir: TimeInRange;
      gmi: Gmi;
      activePatients: number;
      start: Date;
      end: Date;
      lastUpdated: Date;
    }>(),
    'Load Outcomes Failure': props<{ error: string }>(),
  },
});
