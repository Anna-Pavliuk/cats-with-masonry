import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadCatBreeds } from './state/cat.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.store.dispatch(new LoadCatBreeds());
  }
}
