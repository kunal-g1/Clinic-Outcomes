import { createFeature, createReducer, on } from '@ngrx/store';
import { ClinicOutcomesActions } from './clinic-outcomes.actions';
import { ReportingPeriod } from '../models/reporting-period.type';
import { calcDateRange } from './date.utils';

export interface ClinicOutcomesState {
  period: ReportingPeriod;
  start: Date | null;
  end: Date | null;
  lastUpdated: Date | null;

  activePatients: number | null;
  tir: {
    veryLow: number;
    low: number;
    inRange: number;
    high: number;
    veryHigh: number;
  } | null;
  gmi: {
    average: number;
    ranges: { target: number; mid: number; high: number };
  } | null;

  loading: boolean;
  error: string | null;
}

const today = new Date();
const initialRange = calcDateRange(today, 30);

export const initialState: ClinicOutcomesState = {
  period: 30,
  start: initialRange.start,
  end: initialRange.end,
  lastUpdated: today,

  activePatients: null,
  tir: null,
  gmi: null,

  loading: false,
  error: null,
};

export const clinicOutcomesFeature = createFeature({
  name: 'clinicOutcomes',
  reducer: createReducer(
    initialState,

    on(ClinicOutcomesActions.setReportingPeriod, (state, { period }) => {
      const range = calcDateRange(new Date(), period);
      return {
        ...state,
        period,
        start: range.start,
        end: range.end,
        lastUpdated: new Date(),
      };
    }),

    on(ClinicOutcomesActions.loadOutcomes, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(
      ClinicOutcomesActions.loadOutcomesSuccess,
      (state, { tir, gmi, activePatients, start, end, lastUpdated }) => ({
        ...state,
        tir,
        gmi,
        activePatients,
        start,
        end,
        lastUpdated,
        loading: false,
        error: null,
      })
    ),

    on(ClinicOutcomesActions.loadOutcomesFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});

export const {
  name: clinicOutcomesFeatureKey,
  reducer: clinicOutcomesReducer,
  selectClinicOutcomesState,
} = clinicOutcomesFeature;
