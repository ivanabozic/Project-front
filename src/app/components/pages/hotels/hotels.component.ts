import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { FormConfig } from 'src/app/models/form-config';
import { HotelService } from 'src/app/services/hotel-service';
import { HttpService } from 'src/app/services/http-service';
import { FormComponent } from '../../form/form.component';
import { FilterListItem } from 'src/app/models/filter-list-item';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotels: any;
  title: string = "hotels";
  selectId: any;
  config!: FormConfig[];
  configFilterList!: FilterListItem[]
  selected: any;
  form!: FormGroup;
  countries: any[]=[];

  constructor(private dialogService: NbDialogService, private httpService: HttpService, private hotelService: HotelService){}

  async ngOnInit(){
    await this.httpService
    .get('/Hotels/getIds')
    .subscribe(x =>
      {
        this.hotels = x as [];
        this.selectId = this.hotels[0].id;

        this.getData(this.selectId)
      })

      this.form = this.hotelService.getForm();
      this.setConfigFilterList();
  }

  async selectedData($event: any){
    this.selectId = $event;
    
    await this.getData($event)

  }

  async getData(id: any){
    await this.httpService
    .get('/Hotels/getHotel/' + id)
    .subscribe(x =>
      {
        this.selected = x;
      })

      await this.httpService.get('/Destination/countries').subscribe( result => {
        this.countries = result as any;
      });
  }

  addForm(){
    this.setConfig()
    this.form = this.hotelService.getForm();

    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config,
        isEdit: false
      }
    })

    ref.onClose.subscribe((res) => {

    });
  }

  editForm(){
    this.setConfig();
    
      this.hotelService.setForm(this.form, this.selected)

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
        type: 'input-select',
        name: 'destination',
        data: this.countries
      },
      {
        type: 'input-number',
        name: 'numberStar'
      },
      {
        type: 'input-number',
        name: 'roomNumber'
      }
    ]

  }

  setConfigFilterList(){
    this.configFilterList = [
      {
        name: 'name',
        type: 'text'
      },
      {
        name: 'numberStar',
        type: 'number'
      },
      {
        name: 'destination',
        type: 'text'
      },
      {
        name: 'roomNumber',
        type: 'number'
      },
    ]
  }

  filter($event: any){
    this.httpService
    .post('/Hotels/filter', $event)
    .subscribe(x =>
      {
        this.hotels = x as [];
      })
  }
  
}
