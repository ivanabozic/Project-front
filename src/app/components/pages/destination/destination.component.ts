import { Component } from '@angular/core';
import { Column } from '../../table/table.component';
import { Destination } from 'src/app/models/destination';
import { DestinationService } from 'src/app/services/destination-service';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { FormComponent } from '../../form/form.component';
import { FilterItem } from 'src/app/models/filter-item';

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

  constructor(private destinationService: DestinationService, private dialogService: NbDialogService){}

  ngOnInit() {
    this.destinations = this.destinationService.getData();
    this.setColumns();
    this.setFilter();

    this.form = this.destinationService.getForm();
    //this.setConfig();
  }

  setColumns(){
    this.cols = [
      {field: 'id', header: 'Id', width:'25%', editable: true},
      {field: 'name', header: 'Name', width:'25%', editable: true},
      {field: 'description', header: 'Description', width:'25%', editable: true},
      {field: 'country', header: 'Country', width:'25%', editable: true}
    ]
  }

  editForm($event: any){
    if($event){
      this.destinationService.setForm(this.form, $event)
      this.setConfig();

      let ref = this.dialogService.open(FormComponent, {
        context: {
          form: this.form,
          config: this.config
        }
      })
  
      ref.onClose.subscribe((res) => {
 
      });
    }
  }

  setConfig(){
    console.log("value: ", this.form.controls['country'].value)
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
        data: this.destinationService.getDataCounty(),
        select: this.form.controls['country'].value
      }
    ]

  }

  addToForm($event: any){
    this.form = this.destinationService.getForm();
    this.setConfig();
    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.destinations.push(res);
    });
  }

  setFilter(){
    var width= 100 / 7;
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
        name: 'conutry'
      }
    ]
  
}
}
