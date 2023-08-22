import { Component, ViewChild } from '@angular/core';
import { NbStepperComponent } from '@nebular/theme';
import { FormConfig } from 'src/app/models/form-config';
import { DestinationService } from 'src/app/services/destination-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.css']
})
export class FormStepperComponent {

  linearMode = true;

  title: string= 'TEST'

  forms: any[]=[];

  formList: any[]=[];
  
  configList = {
    formName: '',
    placeholder: '',
    label: '',
    formControlName: ''
  }

  config: FormConfig[]=[]
  isDisableButton: boolean = false;
  isEdit: boolean = false;
  @ViewChild('stepper') stepperComponent!: NbStepperComponent; 


  next() { 
    console.log("usao")
    this.stepperComponent.next(); 
  }

  ngOnInit(){
    this.getData();
    this.setForm();
  }

  constructor(private userService: UserService, private destinationService: DestinationService){}

  toggleLinearMode() {
    this.linearMode = !this.linearMode;
  }

  closeDialog(){

  }

  addUser(){
    console.log("formList: ", this.formList)
  }
  getData(){
    this.forms = [
      {
        formName: 'ngForm',
        placeholder: 'Enter your name',
        label: 'Name',
        formControlName: 'name'
      },
      {
        formName: 'movieForm',
        placeholder: 'Enter your favorite movie',
        label: 'Movie',
        formControlName: 'movie'
      },
      {
        formName: 'somethingForm',
        placeholder: 'Enter something',
        label: 'Something',
        formControlName: 'something'
      },
    ]
  }

  setForm(){
    this.formList = [
      {
        label: 'elementaryData',
        form: this.userService.getForm(),
        config: [
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
            name: 'password'
          }
        ]
      },
      {
        label: 'destinations',
        form:  this.destinationService.getForm(),
        config: [
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
            name: 'country'
          }
        ]
      }
    ]
  }

  addPassword($event: any)
  {
  }

  externalValidation($event: any){
    this.isDisableButton = $event;
  }

}
