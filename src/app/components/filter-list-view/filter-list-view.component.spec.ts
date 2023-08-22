import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterListViewComponent } from './filter-list-view.component';

describe('FilterListViewComponent', () => {
  let component: FilterListViewComponent;
  let fixture: ComponentFixture<FilterListViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterListViewComponent]
    });
    fixture = TestBed.createComponent(FilterListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
