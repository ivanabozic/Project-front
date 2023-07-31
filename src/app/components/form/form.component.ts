import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { FormConfig } from 'src/app/models/form-config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  @Output() addNewEntity = new EventEmitter();
  @Input() config: FormConfig[]=[]
  @Input() form!: FormGroup;
  isDisableButton: boolean = false;
  @Input() isEdit: boolean = false;


  constructor(protected ref: NbDialogRef<unknown>, private dialogService: NbDialogService){}

  
  ngOnInit() {
  }

  addUser(){
    this.ref.close(this.form.value)
  }

  public closeDialog(): void {
    this.ref.close();
  }

  checkStatus(item: any){
    if(this.form.controls[item.name]?.valid)
      return true
    else 
      return false;
  }

  addPassword($event: any)
  {
  }

  externalValidation($event: any){
    console.log("isValid: ", $event)
    this.isDisableButton = $event;
  }
}
