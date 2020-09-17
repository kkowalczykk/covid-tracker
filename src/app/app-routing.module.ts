import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { WorldComponent } from './world/world.component';

const routes: Routes = [
  { path: 'world', component: WorldComponent },
  { path: 'countries', component: CountriesComponent },
  { path: '', redirectTo: '/world', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
