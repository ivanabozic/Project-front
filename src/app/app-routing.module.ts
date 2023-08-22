import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/pages/users/users.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { FlightComponent } from './components/pages/flight/flight.component';
import { RecommendationComponent } from './components/pages/recommendation/recommendation.component';
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { HotelsComponent } from './components/pages/hotels/hotels.component';

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
  {
    path: "reservations",
    component: ReservationComponent,
  },
  {
    path: "hotels",
    component: HotelsComponent,
  },
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
