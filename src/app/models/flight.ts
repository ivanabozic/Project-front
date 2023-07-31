import { Data } from "@angular/router";

export interface Flight {
    id?: string;
    origin?: string;
    destination?: string[];
    departure?: Date
    return?: Data
    price?: number
}
