import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterItem } from 'src/app/models/filter-item';


@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent {
  @Input() filter: FilterItem[] = [];
  @Input() custmWidth: any;
  @Output() filterData = new EventEmitter();
  width: any;
  form!: FormGroup;
  public filterModel: any = {};

  ngOnInit() {
    this.width = this.custmWidth / this.filter?.length;

    console.log("width: ", this.width)
    console.log("filter: ", this.filter)
    this.generateFilterModelItem();
  }  

  constructor(private fb: FormBuilder){}


  generateFilterModelItem(){
    this.filter?.forEach((x : any) => {
      this.filterModel[x.name] = "";
    });
  }

  onInputChanged(){
    this.filterData.emit(this.filterModel)
  }
}
