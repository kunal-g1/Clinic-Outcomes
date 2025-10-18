import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportingPeriod } from '../../models/reporting-period.type';
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
