import { Component, signal, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PeriodSelector, ReportingPeriod } from '../../components/period-selector/period-selector';
import { SummaryBar } from '../../components/summary-bar/summary-bar';
import { TimeInRangeChart } from '../../components/time-in-range-chart/time-in-range-chart';
import { GmiChart } from '../../components/gmi-chart/gmi-chart';
import { ClinicOutcomesActions } from '../../store/clinic-outcomes.actions';

@Component({
  selector: 'app-clinic-outcomes-page',
  imports: [PeriodSelector, SummaryBar, TimeInRangeChart, GmiChart],
  templateUrl: './clinic-outcomes-page.html',
  styleUrl: './clinic-outcomes-page.css',
})

export class ClinicOutcomesPage implements OnInit {
  private store = inject(Store);
  period = signal<ReportingPeriod>(30);

  ngOnInit() {
    this.store.dispatch(ClinicOutcomesActions.setReportingPeriod({ period: this.period() }));
  }

  onPeriodChange(p: ReportingPeriod) {
    this.period.set(p);
    this.store.dispatch(ClinicOutcomesActions.setReportingPeriod({ period: p }));
  }
}
