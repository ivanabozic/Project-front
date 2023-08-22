import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service';
import { Column } from '../../table/table.component';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormComponent } from '../../form/form.component';
import { FilterItem } from 'src/app/models/filter-item';
import { environment  } from 'src/assets/environment';
import { HttpService } from 'src/app/services/http-service';
import { FormStepperComponent } from '../../form-stepper/form-stepper.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users!: User[];
  cols!: Column[];
  settings!: FilterItem[];
  config!: FormConfig[];
  formList: any[] = [];
  form!: any;
  form1!: any;
  isEdit: boolean = false;
  constructor(private userService: UserService, private dialogService: NbDialogService, private httpService: HttpService){}

  ngOnInit() {

    this.httpService.get('/User/getAll').subscribe( result => {
      this.users = result as any;
    });

   // let params = new HttpParams().set('_page', this.activePage).set('_limit', this.recordsPerPage);
    this.setColumns();
    this.setFilter();

    //this.form = this.userService.getForm(0);

    this.createForms(null);
  }

  setColumns(){
    this.cols = [
      {field: 'id', header: 'id', width:'25%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'name', header: 'name', width:'25%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'username', header: 'username', width:'25%', editable: true,  type: 'input-text', tooltip: false},
      {field: 'email', header: 'email', width:'25%', editable: true,  type: 'input-text', tooltip: false}
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
        name: 'name'
      },
      {
        type: 'input-text',
        name: 'username'
      },
      {
        type: 'input-text',
        name: 'email'
      },
      {
        type: 'input-password',
        name: 'password',
        disabled: this.isEdit
      }
    ]

  }

  addToForm(){
    this.isEdit = false;
    //this.setConfig()
    //this.form = this.userService.getForm(0);
    this.createForms(null)
    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config,
        isEdit: false,
        formList: this.formList
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.users.push(res);
    });
  }

  editForm($event: any){
    this.isEdit = true;
    //this.setConfig();
    if($event){
      this.createForms($event)

      let ref = this.dialogService.open(FormComponent, {
        context: {
          form: this.form,
          config: this.config,
          isEdit: true,
          formList: this.formList
        }
      })
  
      ref.onClose.subscribe((res) => {
    
      });
    }
  }

  filter($event: any){
    this.httpService
    .post('/User/filter', $event)
    .subscribe(x =>
      {
        this.users = x as [];
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
        name: 'username'
      },
      {
        type: 'input-text', 
        name: 'email'
      }
    ]
  }


  createForms($event: any){

    this.form = this.userService.getForm(0);
    this.form1 = this.userService.getForm(1);

    if(this.isEdit){
      this.userService.setForm(this.form, $event, 0)
      this.userService.setForm(this.form1, $event, 0)
    }
   

    this.setConfig();

    this.formList = [
      {
        form: this.form,
        title: "elementaryData",
        config: this.config
      },
      {
        form: this.form1,
        title: "elementaryData2",
        config: this.config
      }      

    ] 
  }

  openStepper(){
    let ref = this.dialogService.open(FormStepperComponent, {
      context: {
 
      }
    })

    ref.onClose.subscribe((res) => {
  
    });
  }
}

