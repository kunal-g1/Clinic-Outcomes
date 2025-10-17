import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ReportingPeriod = 30 | 60 | 90;

@Component({
  selector: 'app-period-selector',
  imports: [],
  templateUrl: './period-selector.html',
  styleUrls: ['./period-selector.css'],
})
export class PeriodSelector {
  @Input() period: ReportingPeriod = 30;
  @Output() periodChange = new EventEmitter<ReportingPeriod>();

  setPeriod(p: ReportingPeriod) {
    if (this.period !== p) {
      this.period = p;
      this.periodChange.emit(p);
    }
  }
}
