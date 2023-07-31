import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from "../models/user";

@Injectable()
export class UserService {
    getDataUsers(){
        return [
            {
                id: '1', 
                name: 'Leanne Graham', 
                username: 'Bret', 
                email:  'Sincere@april.biz'
            },
            {
                id: '2', 
                name: 'Ervin Howell', 
                username: 'Antonette', 
                email:  'Shanna@melissa.tv'
            },
            {
                id: '3', 
                name: 'Clementine Bauch', 
                username: 'Samantha', 
                email:  'Nathan@yesenia.net'
            },
            {
                id: '4',
                name: 'Patricia Lebsack', 
                username: 'Karianne', 
                email:  'Julianne.OConner@kory.org'
            },
            {
                id: '5', 
                name: 'Chelsey Dietrich', 
                username: 'Kamren', 
                email:  'Lucio_Hettinger@annie.ca'
            }
        ]
    }


    getForm(){
        return new FormGroup(
            {
            id: new FormControl('', [Validators.required]),
            name: new FormControl('', [Validators.required]),
            username: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required])
          });
    }
    setForm(form: FormGroup, data: User){
        form.setValue({
            id: data?.id,
            name: data?.name,
            username: data?.username,
            email: data?.email
        })
    }
}