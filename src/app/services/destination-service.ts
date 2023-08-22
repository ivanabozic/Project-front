import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Destination } from "../models/destination";

@Injectable()
export class DestinationService {
    getData() {
        return [
            {
                id: '1',
                name: 'Majorca',
                description: 'Mallorca, or Majorca, is the largest island of the Balearic Islands, which are part of Spain, and the seventh largest island in the Mediterranean Sea.',
                country: '1'
            },
            {
                id: '2',
                name: 'Paris',
                description: 'Paris (English: /ˈpærɪs/; French pronunciation: ​[paʁi] (listen)) is the capital and most populous city of France, with an official estimated population of 2,102,650 residents as of 1 January 2023[2] in an area of more than 105 km2 (41 sq mi),[5] making it the fourth-most populated city in the European Union as well as the 30th most densely populated city in the world in 2022.',
                country: '2'
            },
            {
                id: '3',
                name: 'Barcelona',
                description: 'Barcelona',
                country: '3'
            }
        ]
    }

    getDataCounty(){
        return [
            {
                id: '1',
                name: 'Portugal'
            },
            {
                id: '2',
                name: 'France'
            },
            {
                id: '3',
                name: 'Germany'
            },
            {
                id: '4',
                name: 'Malta'
            }
        ]
    }

    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            country: new FormControl('')
          });
    }

    setForm(form: FormGroup, data: Destination){
        form.setValue({
            id: data?.id,
            name: data?.name,
            description: data?.description,
            country: data?.country?.id
        })
    }
}
