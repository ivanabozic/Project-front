import { Component } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';
import { RecommendationService } from 'src/app/services/recommendation-service';
import { Column } from '../../table/table.component';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '../../form/form.component';
import { NbDialogService } from '@nebular/theme';
import { FilterItem } from 'src/app/models/filter-item';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent {
  recommendation!: Recommendation[];
  cols!: Column[];
  config!: FormConfig[];
  form!: FormGroup;
  settings!: FilterItem[];

  constructor(private recommendationService: RecommendationService, private dialogService: NbDialogService){}

  ngOnInit() {
    this.recommendation = this.recommendationService.getData();
    this.setColumns();
    this.setFilter();
    
    this.setConfig();
    this.form = this.recommendationService.getForm();
  }

  editForm($event: any){
    if($event){
      this.recommendationService.setForm(this.form, $event)

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

  setColumns(){
    this.cols = [
      {field: 'id', header: 'Id', width:'25%', editable: true},
      {field: 'destination', header: 'Destination', width:'25%', editable: true},
      {field: 'price', header: 'Price', width:'25%', editable: true},
      {field: 'departure', header: 'Departure', width:'25%', editable: true}
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
        name: 'destination'
      },
      {
        type: 'input-number',
        name: 'price'
      },
      {
        type: 'input-text',
        name: 'departure'
      }
    ]

  }

  addToForm($event: any){
    this.form = this.recommendationService.getForm();
    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.recommendation.push(res);
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
        name: 'destination'
      },
      {
        type: 'input-text', 
        name: 'price'
      },
      {
        type: 'input-text', 
        name: 'departure'
      }
    ]
  }
}
