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

  constructor(private flightService: FlightService, private destinationService: DestinationService, private dialogService: NbDialogService){}

  ngOnInit() {
    this.flights = this.flightService.getData();
    this.setColumns();
    this.setFilter();


    this.form = this.flightService.getForm();
  }

  editForm($event: any){
    if($event){
      this.flightService.setForm(this.form, $event)
      this.setConfig();
      let ref = this.dialogService.open(FormComponent, {
        context: {
          form: this.form,
          config: this.config
        }
      })
  
      ref.onClose.subscribe((res) => {
        console.log("edit: ", res)
      });
    }
  }

  setColumns(){
    this.cols = [
      {field: 'id', header: 'Id', width:'16%', editable: true},
      {field: 'origin', header: 'Origin', width:'16%', editable: true},
      {field: 'destination', header: 'Destination', width:'16%', editable: true},
      {field: 'departure', header: 'Departure', width:'16%', editable: true},
      {field: 'return', header: 'Return', width:'16%', editable: true},
      {field: 'price', header: 'Price', width:'16%', editable: true}
    ]
  }

  setConfig(){
    this.config = [
      {
        type: 'input-text', 
        name: 'id'
      },
      {
        type: 'input-text',
        name: 'origin'
      },
      {
        type: 'input-multipleselect',
        name: 'destination',
        data: this.destinationService.getDataCounty(),
        selectArary: this.form.controls['destination'].value
      },
      {
        type: 'input-datatimepicker',
        name: 'departure'
      },
      {
        type: 'input-datatimepicker',
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
        config: this.config
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.flights.push(res);
    });
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
        type: 'input-text', 
        name: 'price'
      }
    ]
  }
}
