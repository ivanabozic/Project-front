import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Flight } from "../models/flight";

@Injectable()
export class FlightService {
    getData(){
        return [
            {
                id: '1', 
                origin: 'Novi Sad', 
                destination: ['1', '2', '3'],
                departure:  new Date("Fri Dec 08 2019 07:44:57"),
                return: new Date("Fri Dec 08 2019 07:44:57"),
                price: 25000,

            },
            {
                id: '2', 
                origin: 'Barcelona', 
                destination: ['2'],
                departure:  new Date("Fri Dec 08 2019 07:44:57"),
                return: new Date("Fri Dec 08 2019 07:44:57"),
                price: 258000,
            },
            {
                id: '3', 
                origin: 'Budapest', 
                destination: ['3'],
                departure:  new Date("Fri Dec 08 2019 07:44:57"),
                return: new Date("Fri Dec 08 2019 07:44:57"),
                price: 19000,
            }
        ]
    }

    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            origin: new FormControl('', [Validators.required]),
            destination: new FormControl([], [Validators.required]),
            departure: new FormControl(''),
            return: new FormControl(''),
            price: new FormControl('')
          });
    }

    setForm(form: FormGroup, data: Flight){
        form.setValue({
            id: data?.id,
            origin: data?.origin,
            destination: data?.destination,
            departure: data?.departure,
            return: data?.return,
            price: data?.price,
        })
    }
}
