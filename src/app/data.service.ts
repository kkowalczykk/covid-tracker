import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private api = 'https://api.covid19api.com'
  private api2 = 'https://covid19.mathdro.id/api';

  getGlobalStats() {
    return this.http.get(this.api + "/summary");
  }

  getGlobalChartStats() {
    return this.http.get(this.api2 + "/daily");
  }

  getCountryStats(country: string) {
    return this.http.get(this.api2 + '/countries/' + country);
  }


  getCountryCases(country: string) {
    return this.http.get(this.api + '/dayone/country/' + country);
  }


  getCountries() {
    return this.http.get(this.api + "/countries")
  }

  constructor(private http: HttpClient) {

  }
}
