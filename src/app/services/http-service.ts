import { HttpClient } from "@angular/common/http";
import { environment } from "../../assets/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService {
    constructor(protected http: HttpClient){}

    public get(path: string) {
        return this.http.get(environment.url + path);
      }


    public post(path: string, body: any) {
        return this.http.post(environment.url + path, body);
      }
}
