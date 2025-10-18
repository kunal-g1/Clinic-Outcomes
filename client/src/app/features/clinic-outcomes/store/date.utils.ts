import { ReportingPeriod } from '../models/reporting-period.type';

export function calcDateRange(end: Date, period: ReportingPeriod) {
  const endLocal = new Date(end);
  const startLocal = new Date(endLocal);
  startLocal.setDate(endLocal.getDate() - (period - 1));

  startLocal.setHours(0, 0, 0, 0);
  endLocal.setHours(23, 59, 59, 999);
  return { start: startLocal, end: endLocal };
}
