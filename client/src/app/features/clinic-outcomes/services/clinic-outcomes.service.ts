import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ReportingPeriod } from '../models/reporting-period.type';
import { TimeInRange } from '../models/tir.model';
import { Gmi } from '../models/gmi.model';

@Injectable({ providedIn: 'root' })
export class ClinicOutcomesService {
  /** Simulate HTTP A: Time in Range percentages */
  getTimeInRange(period: ReportingPeriod): Observable<TimeInRange> {
    const tir: TimeInRange = {
      veryLow: 2,    // <54
      low: 15,       // 54–70
      inRange: 82,   // 70–180
      high: 1,       // 180–240
      veryHigh: 0,   // >240
    };
    return of(tir).pipe(delay(400));
  }

  /** Simulate HTTP B: GMI summary */
  getGmi(period: ReportingPeriod): Observable<Gmi> {
    const gmi: Gmi = {
      average: 6.7,
      ranges: { target: 72, mid: 23, high: 5 },
    };
    return of(gmi).pipe(delay(350));
  }

  /** 3rd endpoint: active patient count */
  getActivePatients(period: ReportingPeriod): Observable<number> {
    return of(120).pipe(delay(300));
  }
}
