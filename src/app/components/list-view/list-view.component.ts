import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterListItem } from 'src/app/models/filter-list-item';
import { HttpService } from 'src/app/services/http-service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  @Input() items: any = [];
  @Input() title: any;
  @Input() url: any;
  @Input() configFilterList: FilterListItem[]=[]
 // @Input() clickedItem: any;
  @Output() pushData = new EventEmitter();
  @Output() filterData = new EventEmitter();
  filterString: FormControl = new FormControl();
  listItems: any;
  clickedItem: any;
  ascList: boolean = true;
  hiddenFilter: boolean = true;
 /* private _clickedItem: string = '';
  @Input() set clickedItem(value: string) {
    this._clickedItem = value;
  }
  get clickedItem(): string {
    return this._clickedItem;
  }*/

  isDeleted: any

  ngOnInit(): void {
    this.listItems = [...this.items]
    this.clickedItem = this.items[0]?.id
  }

  constructor(private httpService: HttpService){}

  async filterList(){
    this.items = [];

    this.listItems.forEach((element: any) => {
      if (((element as any)["name"] as String).toLowerCase().includes(this.filterString.value?.toLowerCase()) == true) {
        this.items.push(element);
      }
    });
  }

  filter($event: any){
    this.filterData.emit($event)
  }
  ngAfterViewInit(){

  }

  ascDscToggle(){
    this.ascList = !this.ascList;


    if (this.ascList){
      return this.items.sort((item1: any, item2: any) => { 
        return this.orderByComparator(item1["name"], item2["name"]);
      });
    }
    else{
      //not asc
      return this.items.sort((item1: any, item2: any) => { 
        return this.orderByComparator(item2["name"], item1["name"]);
      });
    }
  }

  orderByComparator(a:any, b:any):number{

    if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
      //Isn't a number so lowercase the string to properly compare
      if(a.toLowerCase() < b.toLowerCase()) return -1;
      if(a.toLowerCase() > b.toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a) < parseFloat(b)) return -1;
      if(parseFloat(a) > parseFloat(b)) return 1;
     }

    return 0; //equal each other
}


  showItem(id: any){
    this.clickedItem = id;
    this.pushData.emit(id);
  }

}
