import { Component, Input, computed, signal } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import type {
  ApexChart,
  ApexFill,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexStroke,
  ApexDataLabels,
} from 'ng-apexcharts';
import { Gmi } from '../../models/gmi.model';

@Component({
  selector: 'app-gmi-chart',
  imports: [NgApexchartsModule],
  templateUrl: './gmi-chart.html',
  styleUrl: './gmi-chart.css',
})
export class GmiChart {
  @Input() set data(v: Gmi | null) {
    this._data.set(v);
  }
  private _data = signal<Gmi | null>(null);

  private n = (x: unknown, d = 0) => (Number.isFinite(Number(x)) ? Number(x) : d);

  series = computed<ApexNonAxisChartSeries>(() => {
    const d = this._data();
    if (!d?.ranges) return [0, 0, 0];
    const target = this.n(d.ranges.target); // 72
    const mid = this.n(d.ranges.mid); // 23
    const high = this.n(d.ranges.high); // 5
    return [target, mid, high];
  });

  chart: ApexChart = {
    type: 'pie',
    height: 200,
    animations: { enabled: true },
    toolbar: { show: false },
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  };

  stroke: ApexStroke = {
    show: true,
    width: 3,
    colors: ['#ffffff'],
  };

  dataLabels: ApexDataLabels = {
    enabled: true,
    formatter: (val: string, _opts?: unknown) => {
      const num = Math.round(Number(val) || 0);
      return `${num}%`;
    },
    style: { colors: ['#3b3b3b'], fontSize: '13px' },
    dropShadow: { enabled: false },
    background: { enabled: false },
  };

  plotOptions: ApexPlotOptions = {
    pie: {
      expandOnClick: false,
      startAngle: -90,
      dataLabels: {
        offset: -5,
        minAngleToShowLabel: 1,
      },
    },
  };

  legend: ApexLegend = { show: false };

  fill: ApexFill = {
    colors: ['#7BD77B', '#FFD67A', '#F06B6B'],
  };
}
