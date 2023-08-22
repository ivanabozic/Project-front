import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { HttpService } from 'src/app/services/http-service';
import { FormComponent } from '../../form/form.component';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { ReservationService } from 'src/app/services/reservation-service';
import { User } from 'src/app/models/user';
import { FilterListItem } from 'src/app/models/filter-list-item';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {

  reservations: any;
  title: string = "reservations";
  selectId: any;
  config!: FormConfig[];
  selected: any;
  form!: FormGroup;
  countries: any[]=[];
  configFilterList!: FilterListItem[]

  constructor(private dialogService: NbDialogService, private httpService: HttpService, private reservationService: ReservationService){}

  async ngOnInit(){
   /* await this.httpService
    .get('/Reservations/getIds')
    .subscribe(x =>
      {
        this.reservations = x as [];
        this.selectId = this.reservations[0].id;

        this.getData(this.selectId)
      })*/

      await firstValueFrom(this.httpService.get('/Reservations/getIds')).then(async result  => {
        this.reservations = result as [];
        this.selectId = this.reservations[0].id;

        await this.getData(this.selectId)
        console.log(result)

      })
  

      this.form = this.reservationService.getForm();

      this.setConfigFilterList();
  }

  async selectedData(event: any){
    this.selectId = event;
    
    await this.getData(event)
  }

  async getData(id: any){
    await firstValueFrom(this.httpService.get('/Reservations/getReservation/' + id)).then(result  => {
      this.selected = result;
    });
    /*await this.httpService
    .get('/Reservations/getReservation/' + id)
    .subscribe(x =>
      {
        this.selected = x;
      })*/

      await firstValueFrom(this.httpService.get('/Destination/countries')).then(result  => {
        this.countries = result as any;

   
      });
      /*await this.httpService.get('/Destination/Destination').subscribe( result => {
        this.countries = result as any;
      });*/

   
  }
  editForm($event: any){
    this.setConfig();
    if($event){
      this.reservationService.setForm(this.form, this.selected)

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

  addForm(){
    this.setConfig()
    this.form = this.reservationService.getForm();

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

  setConfig(){
    this.config = [
      {
        type: 'input-text', 
        name: 'id'
      },
      {
        type: 'input-text',
        name: 'email'
      },
      {
        type: 'input-select',
        name: 'destination',
        data: this.countries
      },
      {
        type: 'input-date',
        name: 'dateFrom'
      },
      {
        type: 'input-date',
        name: 'dateTo'
      },
      {
        type: 'input-number',
        name: 'price'
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
        name: 'destination',
        type: 'select',
        data: this.countries
      },
      {
        name: 'email',
        type: 'text'
      },
      {
        name: 'price',
        type: 'number'
      },
      {
        name: 'dateFrom',
        type: 'date'
      },
      {
        name: 'dateTo',
        type: 'date'
      },
    ]
  }

  filter($event: any){
    this.httpService
    .post('/Reservations/filter', $event)
    .subscribe(x =>
      {
        this.reservations = x as [];
      })
  }
}
