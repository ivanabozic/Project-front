import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Reservation } from "../models/reservation";

@Injectable()
export class ReservationService {
    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required]),
            destination: new FormControl('', [Validators.required]),
            dateFrom: new FormControl('', [Validators.required]),
            dateTo: new FormControl('', [Validators.required]),
            price: new FormControl(0, [Validators.required])
          });
    }
    setForm(form: FormGroup, data: Reservation){
        form.setValue({
            id: data?.id,
            email: data?.email,
            destination: data?.destination.id,
            dateFrom: data?.dateFrom,
            dateTo: data?.dateTo,
            price: data?.price
        })
    }
}
