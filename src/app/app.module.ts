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
  NbFormFieldModule
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
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http-service';

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
    FilterTableComponent
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
    NbMenuModule.forRoot(),
    AppRoutingModule,
    NbSelectModule,
    NbDatepickerModule.forRoot(),
    NbIconModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    DestinationService,
    FlightService,
    RecommendationService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
