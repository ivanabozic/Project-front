import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table'
import { ReactiveFormsModule } from '@angular/forms';
import { 
  NbThemeModule, 
  NbSidebarModule, 
  NbLayoutModule, 
  NbButtonModule, 
  NbCardModule, 
  NbDialogModule, 
  NbInputModule,
  NbMenuModule,
  NbSelectModule,
  NbDatepickerModule,
  NbIconModule,
  NbFormFieldModule,
  NbTimepickerModule,
  NbTooltipModule,
  NbTabsetModule,
  NbAccordionModule,
  NbStepperModule
 } from '@nebular/theme';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { UserService } from './services/user-service';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/pages/users/users.component';
import { DestinationComponent } from './components/pages/destination/destination.component';
import { FlightComponent } from './components/pages/flight/flight.component';
import { RecommendationComponent } from './components/pages/recommendation/recommendation.component';
import { DestinationService } from './services/destination-service';
import { FlightService } from './services/flight-service';
import { RecommendationService } from './services/recommendation-service';
import { PasswordComponent } from './components/password/password.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from './services/http-service';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from './components/header/header.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReservationComponent } from './components/pages/reservation/reservation.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { ReservationService } from './services/reservation-service';
import { HotelsComponent } from './components/pages/hotels/hotels.component';
import { HotelService } from './services/hotel-service';
import { FilterListViewComponent } from './components/filter-list-view/filter-list-view.component';
import { FormStepperComponent } from './components/form-stepper/form-stepper.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TableComponent,
    UsersComponent,
    DestinationComponent,
    FlightComponent,
    RecommendationComponent,
    PasswordComponent,
    FilterTableComponent,
    HeaderComponent,
    ReservationComponent,
    ListViewComponent,
    HotelsComponent,
    FilterListViewComponent,
    FormStepperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbDialogModule.forRoot(),
    NbSidebarModule.forRoot(), // NbSidebarModule.forRoot(), //if this is your app.module
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    NbTabsetModule,
    NbMenuModule.forRoot(),
    AppRoutingModule,
    NbSelectModule,
    NbAccordionModule,
    TooltipModule, 
    BrowserAnimationsModule,
    NbTooltipModule,
    NbDatepickerModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbIconModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    HttpClientModule,
    NbStepperModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    UserService,
    DestinationService,
    FlightService,
    RecommendationService,
    ReservationService,
    HttpService,
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
