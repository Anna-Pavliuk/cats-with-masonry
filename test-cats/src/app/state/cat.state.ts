import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { CatApiService } from '../cat-api.service';
import { tap } from 'rxjs/operators';

export interface CatStateModel {
  images: any[];
  breeds: any[];
}

export class LoadCatImages {
  static readonly type = '[Cat] Load Images';

  constructor(public payload: any[]) {}
}

export class LoadCatBreeds {
  static readonly type = '[Cat] Load Breeds';
}

@State<CatStateModel>({
  name: 'cats',
  defaults: {
    images: [],
    breeds: [],
  },
})
@Injectable()
export class CatState {
  constructor(private catApiService: CatApiService) {}

  @Selector()
  static images(state: CatStateModel): any[] {
    return state.images;
  }

  @Selector()
  static breeds(state: CatStateModel): any[] {
    return state.breeds;
  }

  @Action(LoadCatImages)
  loadCatImages(ctx: StateContext<CatStateModel>, action: LoadCatImages): void {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      images: action.payload,
    });
  }

  @Action(LoadCatBreeds)
  loadCatBreeds(ctx: StateContext<CatStateModel>): void {
    this.catApiService.getBreeds().pipe(
      tap((breeds) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          breeds: breeds,
        });
      })
    ).subscribe();
  }
}
