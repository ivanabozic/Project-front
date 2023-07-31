import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recommendation } from "../models/recommendation";

@Injectable()
export class RecommendationService {
    getData(){
        return [
            {
                id: '1', 
                destination: 'Portugal', 
                price: 300,
                departure:  new Date("Fri Dec 08 2019 07:44:57"),

            },
            {
                id: '2', 
                destination: 'Malta', 
                price: 400,
                departure:  new Date("Fri Dec 09 2019 07:44:57"),

            },
            {
                id: '3', 
                destination: 'Dubai', 
                price: 900,
                departure:  new Date("Fri Dec 23 2019 07:44:57"),

            }
        ]
    }

    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            destination: new FormControl('', [Validators.required]),
            price: new FormControl(''),
            departure: new FormControl('')
          });
    }

    setForm(form: FormGroup, data: Recommendation){
        form.setValue({
            id: data?.id,
            destination: data?.destination,
            price: data?.price,
            departure: data?.departure
        })
    }
}
