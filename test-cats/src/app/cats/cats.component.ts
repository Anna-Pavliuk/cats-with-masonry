import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CatApiService } from '../cat-api.service';
import { CatState, LoadCatBreeds, LoadCatImages } from '../state/cat.state';
import { trigger, transition, style, animate, state, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
  animations: [
    trigger('tadaAnimation', [
      transition(':enter', [
        animate('1s', keyframes([
          style({ transform: 'scale(0.5)', offset: 0 }),
          style({ transform: 'scale(1.1)', offset: 0.5 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ]
})
export class CatsComponent implements OnInit {

  @Select(CatState.images) cats$: Observable<any[]> | undefined;
  @Select(CatState.breeds) breeds$: Observable<any[]> | undefined;

  breeds: any[] = []; 
  _counts: number[] = [1,2,5,10,15,20,50,60,80];
  catForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private catApiService: CatApiService,
    private store: Store,
  ) {
    this.catForm = this.fb.group({
      breeds: [[]],
      limit: [10],
    });
  }

  ngOnInit(): void {
    this.loadCatBreeds();
    this.loadCatImages();
  }

  loadCatBreeds(): void {
    this.store.dispatch(new LoadCatBreeds());
  }

  loadCatImages(): void {
    const { breeds, limit } = this.catForm.value;
    this.catApiService.getCatImages(breeds, limit).pipe(
      tap((images) => this.store.dispatch(new LoadCatImages(images))),
    ).subscribe();
  }
}

