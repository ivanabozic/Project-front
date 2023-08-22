import { Component } from '@angular/core';
import { Column } from '../../table/table.component';
import { Destination } from 'src/app/models/destination';
import { DestinationService } from 'src/app/services/destination-service';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { FormComponent } from '../../form/form.component';
import { FilterItem } from 'src/app/models/filter-item';
import { HttpService } from 'src/app/services/http-service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent {
  destinations!: Destination[];
  cols!: Column[];
  config!: FormConfig[];
  form!: FormGroup;
  settings!: FilterItem[];
  countries: any;
  constructor(private destinationService: DestinationService, private dialogService: NbDialogService, private httpService: HttpService){}

  ngOnInit() {
    var body = {}
    this.httpService
    .post('/Destination/filter', body)
    .subscribe(x =>
      {
        this.destinations = x as [];
        console.log("des: ", this.destinations)
      })

    this.setColumns();
    this.setFilter();

    this.form = this.destinationService.getForm();
    //this.setConfig();

    this.getDataCounty()
  }

  setColumns(){
    this.cols = [
      {
        field: 'id', 
        header: 'id', 
        width:'25%', 
        editable: true,
        type: 'input-text',
        tooltip: false
      },
      {
        field: 'name', 
        header: 'name', 
        width:'25%', 
        editable: true,  
        type: 'input-text',
        tooltip: false
      },
      {
        field: 'description', 
        header: 'description', 
        width:'25%', 
        editable: true,  
        type: 'input-text',
        tooltip: true
      },
      {
        field: 'country', 
        header: 'country', 
        width:'25%', 
        editable: true,
        type: "input-select",
        tooltip: false
      }
    ]
  }

  editForm($event: any){
    if($event){
      this.destinationService.setForm(this.form, $event)
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

  setConfig(){
    this.config = [
      {
        type: 'input-text', 
        name: 'id'
      },
      {
        type: 'input-text',
        name: 'name'
      },
      {
        type: 'input-text',
        name: 'description'
      },
      {
        type: 'input-select',
        name: 'country',
        data: this.countries
      }
    ]

  }

  getDataCounty(){
    this.httpService.get('/Destination/countries').subscribe( result => {
      this.countries = result as any;
    });

  }


  addToForm($event: any){
    this.form = this.destinationService.getForm();
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
        this.destinations.push(res);
    });
  }

  filter($event: any){
    this.httpService
    .post('/Destination/filter', $event)
    .subscribe(x =>
      {
        this.destinations = x as [];
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
        name: 'name'
      },
      {
        type: 'input-text', 
        name: 'description'
      },
      {
        type: 'input-text', 
        name: 'country'
      }
    ]
  
}
}
