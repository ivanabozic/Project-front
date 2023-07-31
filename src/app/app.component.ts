import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';

  items: NbMenuItem[] = [
    {
      title: 'Users',
      link:'users'
    },
    {
      title: 'Destinations',
      link:'destinations'
    },
    {
      title: 'Flights',
      link: 'flights'
    },
    {
      title: 'Recommendations',
      link: 'recommendations'
    }
  ]
}
