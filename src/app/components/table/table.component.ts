import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { NbDialogService } from "@nebular/theme";
import { FormComponent } from '../form/form.component';
import { FormConfig } from 'src/app/models/form-config';
import { FormGroup } from '@angular/forms';
import { FilterItem } from 'src/app/models/filter-item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ViewChild(FormComponent) formComponent!: FormComponent;
  @Output() pushData = new EventEmitter();
  @Output() editData = new EventEmitter();
  @Output() filterData = new EventEmitter();
  
  @Input() data: any[]=[];
  @Input() cols: Column[] = [];
  @Input() settings: FilterItem[] = [];
  @Input() config: FormConfig[]=[]
  @Input() form!: FormGroup;
  @Input() custmWidth: any;
  selectedMessages: any;
  mail: any;
  hideLast: boolean = false;
  selectedRows: [] = [];
  selectedItem: any; 
  activePage: number = 1;
  numberOfPages: number = 10;
  pages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  
  readonly ADDITONAL_PAGES_BOUNDARY = 4;
  readonly PAGINATION_INITIAL_PAGE = 1;
  readonly ABSOLUTE_DIFFERENCE_BETWEEN_ACTIVE_AND_CURRENT_PAGE = 2;
  constructor(private dialogService: NbDialogService,){}

  ngOnInit() {

  }  

  addForm(){
    this.pushData.emit();
  }

  editItem(item: any){

    this.editData.emit(item)
  }

  delete(item: any){
    this.data = this.data.filter(x => x.id !== item.id)
  }

  changePage(page: any){
    this.activePage = page;
  }


  filter($event: any){
    this.filterData.emit($event)
  }

  get displayPages(): number[] {
    if (this.pages.length > this.ADDITONAL_PAGES_BOUNDARY) {
      return this.pages.filter(x => {
        let diff = this.activePage - x;
        let isEligible = Math.abs(diff) <= this.ABSOLUTE_DIFFERENCE_BETWEEN_ACTIVE_AND_CURRENT_PAGE;
        if (isEligible) {
          this.hideLast = x === this.numberOfPages;
        }
        return isEligible;
      });
    }
    this.hideLast = true;
    return this.pages;
  }


}

export interface Column {
  field: string;
  header: string;
  width: string;
  editable: boolean;
}


