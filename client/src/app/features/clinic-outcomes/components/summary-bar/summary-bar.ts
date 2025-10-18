import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportingPeriod } from '../../models/reporting-period.type';

@Component({
  selector: 'app-summary-bar',
  imports: [DatePipe],
  templateUrl: './summary-bar.html',
  styleUrl: './summary-bar.css',
})
export class SummaryBar {
  @Input() activePatients: number | null = null;
  @Input() period!: ReportingPeriod;
  @Input() start: Date | null = null;
  @Input() end: Date | null = null;
  @Input() lastUpdated: Date | null = null;
}
