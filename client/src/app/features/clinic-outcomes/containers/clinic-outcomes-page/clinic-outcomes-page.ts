import { Component, signal, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeriodSelector } from '../../components/period-selector/period-selector';
import { SummaryBar } from '../../components/summary-bar/summary-bar';
import { TimeInRangeChart } from '../../components/time-in-range-chart/time-in-range-chart';
import { GmiChart } from '../../components/gmi-chart/gmi-chart';
import { ClinicOutcomesActions } from '../../store/clinic-outcomes.actions';
import {
  selectActivePatients,
  selectDateRange,
  selectLastUpdated,
  selectPeriod,
  selectTimeInRange,
  selectGmi,
  selectLoading,
  selectError,
} from '../../store/clinic-outcomes.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReportingPeriod } from '../../models/reporting-period.type';

@Component({
  selector: 'app-clinic-outcomes-page',
  imports: [PeriodSelector, SummaryBar, TimeInRangeChart, GmiChart],
  templateUrl: './clinic-outcomes-page.html',
  styleUrl: './clinic-outcomes-page.css',
})

export class ClinicOutcomesPage implements OnInit {
  private store = inject(Store);
  period = signal<ReportingPeriod>(30);

  selPeriod = toSignal(this.store.select(selectPeriod), { initialValue: 30 as ReportingPeriod });
  selRange = toSignal(this.store.select(selectDateRange), { initialValue: { start: null, end: null } });
  selLastUpdated = toSignal(this.store.select(selectLastUpdated), { initialValue: null });
  selActive = toSignal(this.store.select(selectActivePatients), { initialValue: null });
  selTir = toSignal(this.store.select(selectTimeInRange), { initialValue: null });
  selGmi = toSignal(this.store.select(selectGmi), { initialValue: null });
  selLoading = toSignal(this.store.select(selectLoading), { initialValue: false });
  selError = toSignal(this.store.select(selectError), { initialValue: null });

  ngOnInit() {
    this.store.dispatch(ClinicOutcomesActions.setReportingPeriod({ period: this.period() }));
  }

  onPeriodChange(p: ReportingPeriod) {
    this.period.set(p);
    this.store.dispatch(ClinicOutcomesActions.setReportingPeriod({ period: p }));
  }
}
