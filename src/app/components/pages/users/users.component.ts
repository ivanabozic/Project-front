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
  form!: FormGroup;
  isEdit: boolean = false;
  constructor(private userService: UserService, private dialogService: NbDialogService, private httpService: HttpService){}

  ngOnInit() {
    console.log("usao")
    this.httpService.get('/User/getAll').subscribe( result => {
      this.users = result as any;
    });

   // let params = new HttpParams().set('_page', this.activePage).set('_limit', this.recordsPerPage);
    this.setColumns();
    this.setFilter();

    this.form = this.userService.getForm();
  }

  setColumns(){
    this.cols = [
      {field: 'id', header: 'Id', width:'25%', editable: true},
      {field: 'name', header: 'Name', width:'25%', editable: true},
      {field: 'username', header: 'Username', width:'25%', editable: true},
      {field: 'email', header: 'Email', width:'25%', editable: true}
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
    this.setConfig()
    this.form = this.userService.getForm();

    let ref = this.dialogService.open(FormComponent, {
      context: {
        form: this.form,
        config: this.config,
        isEdit: false
      }
    })

    ref.onClose.subscribe((res) => {
      if(res)
        this.users.push(res);
    });
  }

  editForm($event: any){
    this.isEdit = true;
    this.setConfig();
    if($event){
      this.userService.setForm(this.form, $event)

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

  filter($event: any){
    console.log("usao: ", $event)
    this.httpService.get('/User/getAll').subscribe( result => {
      this.users = result as any;
    });

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
}

