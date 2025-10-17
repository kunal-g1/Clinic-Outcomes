import { Component, signal } from '@angular/core';
import { PeriodSelector, ReportingPeriod } from '../../components/period-selector/period-selector';
import { SummaryBar } from '../../components/summary-bar/summary-bar';
import { TimeInRangeChart } from '../../components/time-in-range-chart/time-in-range-chart';
import { GmiChart } from '../../components/gmi-chart/gmi-chart';

@Component({
  selector: 'app-clinic-outcomes-page',
  imports: [PeriodSelector, SummaryBar, TimeInRangeChart, GmiChart],
  templateUrl: './clinic-outcomes-page.html',
  styleUrl: './clinic-outcomes-page.css',
})

export class ClinicOutcomesPage {
  period = signal<ReportingPeriod>(30);

  onPeriodChange(p: ReportingPeriod) {
    this.period.set(p);
  }
}
