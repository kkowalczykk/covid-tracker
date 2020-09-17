import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  public data: any;

  public chartDataCases = [
    { data: [], label: 'Cases', borderColor: ['rgb(0,200,230)'], fill: true, backgroundColor: ['rgba(0,200,230,0.5)'], pointBackgroundColor: 'rgb(0,200,230)' },

  ]

  public chartDataDeaths = [
    { data: [], label: 'Deaths' },
  ]

  public chartLabels = [];

  public chartOptions = {
    scaleShovVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          fontColor: "white",
          stepsize: 4,
        }
      }],
      xAxes: [{
        ticks: {
          fontColor: "white",
        }
      }]
    }
  };



  public chartLegend = true;
  public chart = "line";

  test() {
    console.log(this.chartDataCases);
    console.log(this.chartLabels);
    console.log(this.data);
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGlobalStats().subscribe(data => this.data = data);
    this.dataService.getGlobalChartStats().subscribe((data: any[]) => {
      for (let i = 100; i > 0; i = i - 3) {
        this.chartDataCases[0].data.push(data[data.length - i].totalConfirmed);
        this.chartDataDeaths[0].data.push(data[data.length - i].deaths.total);
        this.chartLabels.push(data[data.length - i].reportDate);
      }

    })
  }

}
