import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/pages/users/users.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { FlightComponent } from './components/pages/flight/flight.component';
import { RecommendationComponent } from './components/pages/recommendation/recommendation.component';

const routes: Routes = [

  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "destinations",
    component: DestinationComponent,
  },
  {
    path: "flights",
    component: FlightComponent,
  },
  {
    path: "recommendations",
    component: RecommendationComponent,
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
