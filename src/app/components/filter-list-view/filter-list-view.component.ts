import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterListItem } from 'src/app/models/filter-list-item';

@Component({
  selector: 'app-filter-list-view',
  templateUrl: './filter-list-view.component.html',
  styleUrls: ['./filter-list-view.component.css']
})
export class FilterListViewComponent {
  @Input() configFilterList: FilterListItem[]=[]
  @Output() filterData = new EventEmitter();
  public filterModel: any = {};


  ngOnInit() {
    this.generateFilterModelItem();
  }

  generateFilterModelItem(){
    console.log("confi: ", this.configFilterList)
    this.configFilterList?.forEach((x : any) => {
      if(x.type == 'number'){
        this.filterModel[x.name] = 0;
      }
      else if(x.type == 'text'){
        this.filterModel[x.name] = "";
      }
      else{
        this.filterModel[x.name] = "";
      }
   
    });
  }

  onFilterChanged(){
    this.filterData.emit(this.filterModel)
  }

  onClear(){
    this.configFilterList?.forEach((x : any) => {
      if(x.type == 'number'){
        this.filterModel[x.name] = 0;
      }
      else if(x.type == 'text'){
        this.filterModel[x.name] = "";
      }
      else{
        this.filterModel[x.name] = null;
      }
    });
  }
}
