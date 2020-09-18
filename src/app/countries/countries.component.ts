import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  selectedCountry: any;
  countries: any[] = [];
  countryData: any[] = [];
  public dataChart = [
    { data: [], label: 'Confirmed', borderColor: ['rgb(0,200,230)'], fill: false, backgroundColor: ['rgba(0,200,230,0.5)'], pointBackgroundColor: 'rgb(0,200,230)', yAxisID: 'A', pointRadius: 2, pointHoverRadius: 2 },
    { data: [], label: 'Recovered', borderColor: ['rgb(0,240,100)'], fill: false, backgroundColor: ['rgba(0,240,100,0.5)'], pointBackgroundColor: 'rgb(0,240,100)', yAxisID: 'A', pointRadius: 2, pointHoverRadius: 2 },
    { data: [], label: 'Deaths', type: 'bar', backgroundColor: 'rgba(230,40,40,0.5)', borderColor: ['rgb(0,240,100)'], yAxisID: 'Deaths', fill: true },
  ]

  public chartLabels = [];

  public chartOptions = {
    scaleShovVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'A',
          ticks: {
            fontColor: "white",
            stepsize: 4,
          },
          scaleLabel: {
            display: true,
            labelString: 'Confirmed, Recovered',
            beginAtZero: true,
            fontColor: "white",
          },
          position: 'left',
          scalePositionLeft: true
        },
        {
          id: 'Deaths',
          ticks: {
            fontColor: "white",
            stepsize: 4,
          },
          scaleLabel: {
            display: true,
            labelString: 'Deaths',
            beginAtZero: true,
            fontColor: "white",
          },
          position: 'right',
          scalePositionLeft: false,
        }
      ],
      xAxes: [{

        display: false,
      }]
    },

  };

  public chartLegend = true;
  public chart = "line";



  change() {
    this.countryData = [];
    this.dataChart[0].data = [];
    this.dataChart[1].data = [];
    this.dataChart[2].data = [];
    this.chartLabels = [];
    this.dataService.getCountryCases(this.selectedCountry).subscribe((data: any[]) => {
      this.countryData = data;
      for (let i = 100; i > 0; i--) {
        this.dataChart[0].data.push(this.countryData[this.countryData.length - i].Confirmed);
        this.dataChart[2].data.push(this.countryData[this.countryData.length - i].Deaths);
        this.dataChart[1].data.push(this.countryData[this.countryData.length - i].Recovered);
        this.chartLabels.push(this.countryData[this.countryData.length - i].Date.slice(0, 10));
      }
    })
  }




  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        this.countries.push([data[i].Country, data[i].Slug])
      }
      this.countries.sort();
      this.selectedCountry = ['poland'];
      this.dataService.getCountryCases(this.selectedCountry).subscribe((data: any[]) => {
        this.countryData = data;
        for (let i = 100; i > 0; i--) {
          this.dataChart[0].data.push(this.countryData[this.countryData.length - i].Confirmed);
          this.dataChart[2].data.push(this.countryData[this.countryData.length - i].Deaths);
          this.dataChart[1].data.push(this.countryData[this.countryData.length - i].Recovered);
          this.chartLabels.push(this.countryData[this.countryData.length - i].Date.slice(0, 10));
        }
      })
    })
  }

}
