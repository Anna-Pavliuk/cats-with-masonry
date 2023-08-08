import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { CatsComponent } from './cats/cats.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HelloComponent,
  },
  {
    path: 'cats',
    component: CatsComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
