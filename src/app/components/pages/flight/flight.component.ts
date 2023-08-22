import { Component } from '@angular/core';
import { Flight } from 'src/app/models/flight';
import { Column } from '../../table/table.component';
import { FlightService } from 'src/app/services/flight-service';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { DestinationService } from 'src/app/services/destination-service';
import { NbDialogService } from '@nebular/theme';
import { FormComponent } from '../../form/form.component';
import { FilterItem } from 'src/app/models/filter-item';
import { HttpService } from 'src/app/services/http-service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent {
  flights!: Flight[];
  cols!: Column[];
  config!: FormConfig[];
  form!: FormGroup;
  settings!: FilterItem[];
  countries: any;

  constructor(private flightService: FlightService, private destinationService: DestinationService, private dialogService: NbDialogService, private httpService: HttpService){}

  ngOnInit() {
   // this.flights = this.flightService.getData();

   this.httpService
      .post('/Flights/filter', {})
      .subscribe(x =>
        {
          this.flights = x as [];
        })

    this.setColumns();
    this.setFilter();

    this.getDataCounty()


    this.form = this.flightService.getForm();
  }

  editForm($event: any){
    if($event){
      this.flightService.setForm(this.form, $event)
      this.setConfig();
      let ref = this.dialogService.open(FormComponent, {
        context: {
          form: this.form,
          config: this.config,
          isEdit: true
        }
      })
  
      ref.onClose.subscribe((res) => {

      });
    }
  }

  setColumns(){
    this.cols = [
      {field: 'id', header: 'id', width:'16%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'origin', header: 'origin', width:'16%', editable: true,  type: 'input-select', tooltip: false},
      {field: 'destination', header: 'destination', width:'16%', editable: true,  type: 'input-select', tooltip: false},
      {field: 'departure', header: 'departure', width:'16%', editable: true,  type: 'input-date', tooltip: false},
      {field: 'return', header: 'return', width:'16%', editable: true,  type: 'input-date', tooltip: false},
      {field: 'price', header: 'price', width:'16%', editable: true,  type: 'input-text', tooltip: false}
    ]
  }

  setConfig(){
    this.config = [
      {
        type: 'input-text', 
        name: 'id'
      },
      {
        type: 'input-select',
        name: 'origin',
        data: this.countries
      },
      {
        type: 'input-select',
        name: 'destination',
        data: this.countries
      },
      {
        type: 'input-datatime',
        name: 'departure'
      },
      {
        type: 'input-datatime',
        name: 'return'
      },
      {
        type: 'input-text',
        name: 'price'
      }
    ]

  }

  addToForm($event: any){
    this.form = this.flightService.getForm();
    this.setConfig();
    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config,
        isEdit: false
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.flights.push(res);
    });
  }

  filter($event: any){
    this.httpService
    .post('/Flights/filter', $event)
    .subscribe(x =>
      {
        this.flights = x as [];
      })
  }

  setFilter(){
    this.settings = [
      {
        type: 'input-text', 
        name: 'id'
      },
      {
        type: 'input-text', 
        name: 'origin'
      },
      {
        type: 'input-text', 
        name: 'destination'
      },
      {
        type: 'input-text', 
        name: 'departure'
      },
      {
        type: 'input-text', 
        name: 'return'
      },
      {
        type: 'input-number', 
        name: 'price'
      }
    ]
  }

  getDataCounty(){
    this.httpService.get('/Destination/countries').subscribe( result => {
      this.countries = result as any;
    });

  }

}
