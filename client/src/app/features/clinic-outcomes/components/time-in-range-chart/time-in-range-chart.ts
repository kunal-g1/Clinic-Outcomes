import { Component, Input, computed, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import type {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis
} from 'ng-apexcharts';
import { TimeInRange } from '../../models/tir.model';

@Component({
  selector: 'app-time-in-range-chart',
  imports: [NgApexchartsModule],
  templateUrl: './time-in-range-chart.html',
  styleUrl: './time-in-range-chart.css',
})
export class TimeInRangeChart {
  @Input() set data(v: TimeInRange | null) {
    this._data.set(v);
  }
  private _data = signal<TimeInRange | null>(null);

  private asPct(n: any) {
    const v = Number(n ?? 0);
    return Number.isFinite(v) ? Math.max(0, Math.min(100, Math.round(v))) : 0;
  }

  series = computed<ApexAxisChartSeries>(() => {
    const d = this._data();
    if (!d) return [];

    const veryLow = this.asPct(d.veryLow); // <54
    const low = this.asPct(d.low); // 54–70
    const inRange = this.asPct(d.inRange); // 70–180
    const high = this.asPct(d.high); // 180–240
    const veryHigh = this.asPct(d.veryHigh); // ≥240

    const sum = veryLow + low + inRange + high + veryHigh || 1;
    const n = (x: number) => Math.round((x / sum) * 100);

    return [
      { name: '<54', data: [n(veryLow)] }, // 0%
      { name: '54–70', data: [n(low)] }, // 2%
      { name: '70–180', data: [n(inRange)] }, // 82%
      { name: '180–240', data: [n(high)] }, // 15%
      { name: '≥240', data: [n(veryHigh)] }, // 1%
    ];
  });

  chart: ApexChart = {
    type: 'bar',
    stacked: true,
    stackType: '100%',
    height: 290,
    toolbar: { show: false },
    animations: { enabled: true },
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  };

  legend: ApexLegend = { show: false };

  stroke: ApexStroke = { show: false, width: 0 };

  plotOptions: ApexPlotOptions = {
    bar: { horizontal: false, columnWidth: '50px', dataLabels: { position: 'center' } },
  };

  xaxis: ApexXAxis = {
    categories: ['TIR'],
    labels: { show: false },
    axisBorder: { show: false },
    axisTicks: { show: false },
  };

  yaxis: ApexYAxis = { min: 0, max: 100, tickAmount: 5, labels: { show: false } };
  grid: ApexGrid = { show: false };

  // helper to push any apex value to a number
  private toNum = (v: unknown) => Array.isArray(v) ? Number(v[0]) : Number(v);

  dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (v: unknown) => {
      const n = this.toNum(v);
      // show only big slices inline (82%, 15%)
      return n >= 10 ? `${n}%` : '';
    },
    style: { colors: ['#3b3b3b'], fontSize: '14px', fontWeight: 600 },
    textAnchor: 'start',
    offsetX: 34,
    background: { enabled: false },
    dropShadow: { enabled: false },
  };

  fill: ApexFill = {
    type: ['solid', 'pattern', 'solid', 'pattern', 'solid'],
    colors: ['#F06B6B', '#F06B6B', '#7BD77B', '#FFD67A', '#FF9F5A'],
    opacity: 1,
    pattern: {
      style: ['slantedLines', 'slantedLines', 'slantedLines', 'slantedLines', 'slantedLines'],
      width: 6,
      strokeWidth: 2,
    },
  };

  tooltip: ApexTooltip = { y: { formatter: (v) => `${v}%` } };
}
