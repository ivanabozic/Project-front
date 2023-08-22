import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Hotel } from "../models/hotel";

@Injectable()
export class HotelService {
    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            numberStar: new FormControl(0, [Validators.required]),
            destination: new FormControl('', [Validators.required]),
            roomNumber: new FormControl(0, [Validators.required])
          });
    }
    setForm(form: FormGroup, data: Hotel){
        form.setValue({
            id: data?.id,
            name: data?.name,
            numberStar: data?.numberStar,
            destination: data?.destination.id,
            roomNumber: data?.roomNumber
        })
    }
}
