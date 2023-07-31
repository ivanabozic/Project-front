import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  form!: FormGroup
  showPassword = true;
  showConfirmPassword = true;
  isValid: boolean = true;
  @Output() pushData = new EventEmitter();
  @Output() validationEmitter = new EventEmitter();
  
  constructor(private fb: FormBuilder){}
  
  ngOnInit(): void {
    this.setForm();
  }

  getInputTypePassword() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  getInputTypeConfirmPassword() {
    if (this.showConfirmPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  setForm(){
    this.form = this.fb.group({
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]]
    })

    this.onKey();
  }

  onKey(){
    if(this.checkValidation()){
      this.pushData.emit(this.form.value.password)
      this.validationEmitter.emit(false)
    }
    else{
      this.pushData.emit("")
      this.validationEmitter.emit(true);
    }
 
      
  }

  checkValidation(){
    var password = this.form.controls["password"].value;
    var confirmPassword = this.form.controls["confirmPassword"].value
    if(password == "" && confirmPassword == "")
      return false;
    else if(password == confirmPassword)
      return true;
    else
      return false;
  }
}
