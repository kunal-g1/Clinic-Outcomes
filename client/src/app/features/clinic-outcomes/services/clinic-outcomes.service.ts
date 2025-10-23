import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { ReportingPeriod } from '../models/reporting-period.type';
import { TimeInRange } from '../models/tir.model';
import { Gmi } from '../models/gmi.model';

@Injectable({ providedIn: 'root' })
export class ClinicOutcomesService {
  constructor(private http: HttpClient) {}

  /** Simulate HTTP A: Time in Range */
  getTimeInRange(period: ReportingPeriod): Observable<TimeInRange> {
    return this.http
      .get<TimeInRange>(`assets/mock/outcomes/getTIR${period}.json`)
      .pipe(delay(400));
  }

  /** Simulate HTTP B: GMI */
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
