import { Component } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation';
import { RecommendationService } from 'src/app/services/recommendation-service';
import { Column } from '../../table/table.component';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '../../form/form.component';
import { NbDialogService } from '@nebular/theme';
import { FilterItem } from 'src/app/models/filter-item';
import { HttpService } from 'src/app/services/http-service';

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
  countries: any;

  constructor(private recommendationService: RecommendationService, private dialogService: NbDialogService, private httpService: HttpService){}

  ngOnInit() {
    //this.recommendation = this.recommendationService.getData();

    this.httpService
    .post('/Recommendation/filter', {})
    .subscribe(x =>
      {
        this.recommendation = x as [];
      })

    this.getDataCounty();
    this.setColumns();
    this.setFilter();
  
    this.setConfig();
    this.form = this.recommendationService.getForm();
  }

  editForm($event: any){

    if($event){
      this.recommendationService.setForm(this.form, $event)
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
      {field: 'id', header: 'id', width:'25%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'destination', header: 'destination', width:'25%', editable: true,  type: 'input-select', tooltip: false},
      {field: 'price', header: 'price', width:'25%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'departure', header: 'departure', width:'25%', editable: true,  type: 'input-date', tooltip: false}
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
        name: 'destination',
        data: this.countries
      },
      {
        type: 'input-number',
        name: 'price'
      },
      {
        type: 'input-datatime',
        name: 'departure'
      }
    ]

  }

  addToForm($event: any){
    this.form = this.recommendationService.getForm();
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
        type: 'input-number', 
        name: 'price'
      },
      {
        type: 'input-text', 
        name: 'departure'
      }
    ]
  }

  filter($event: any){
    this.httpService
    .post('/Recommendation/filter', $event)
    .subscribe(x =>
      {
        this.recommendation = x as [];
      })
  }

  getDataCounty(){
    this.httpService.get('/Destination/countries').subscribe( result => {
      this.countries = result as any;
    });

  }
}
