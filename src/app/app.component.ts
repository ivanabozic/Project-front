import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import en from '../assets/i18n/en.json';
import sr from '../assets/i18n/sr.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  selected = '2';
  selectedLang: any = 'en';
  items: NbMenuItem[] = [
    {
      title: 'users',
      link:'users',
      icon: "person-outline",
      data: 'users'
    },
    {
      title: 'destinations',
      icon: "pin-outline",
      expanded: true,
      data: 'destinations',
      children:[
        {
          title: 'allDestinations',
          link: 'destinations',
          icon: "pin-outline",
          data: 'allDestinations'
        },
        {
          title: 'hotels',
          link: 'hotels',
          icon: "home-outline",
          data: 'hotels'
        }
      ]
    },
    {
      title: 'flights',
      link: 'flights',
      icon: "flag-outline",
      data: 'flights'
    },
    {
      title: 'recommendations',
      link: 'recommendations',
      icon: "book-open-outline",
      data: 'recommendations'
    },
    {
      title: 'reservations',
      link: 'reservations',
      icon: "file-text-outline",
      data: 'reservations'
    },
    
  ]

  constructor( private translate: TranslateService, private sidebarService: NbSidebarService,
){
    this.translate.setTranslation("en", en);
    this.translate.setTranslation("sr", sr);
    this.translate.setDefaultLang("en");
    this.translate.use("en");
  }

  ngOnInit(){
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateMenuItems();
    });

    this.translateMenuItems();
  }


  onOptionsSelected($event: any){
    if($event == 1)
      this.translate.use("sr");
    else
      this.translate.use("en");
  }


  translateMenuItems(){
    this.items.forEach((item) => {
      this.translateMenuItem(item);
    })
  }
  translateMenuItem(menuItem: NbMenuItem){
    console.log("menuItem: ", menuItem)

    if(menuItem.children != null)
      menuItem.children.forEach((item) => this.translateMenuItem(item))

    menuItem.title = this.translate.instant(menuItem.data)
  }

  
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    return false;
  }
}


