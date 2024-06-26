import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { AboutComponent } from './components/about/about.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
  { 
    path: "",
    redirectTo: "/car",
    pathMatch: "full"
  },
  {
    path: "car",
    component: CarListComponent
  },
  {
    path: "signin",
    component: SignInComponent
  },
  {
    path: "signup",
    component: SignUpComponent
  },
  {
    path: "car/:id",
    component: DetailComponent
  },
  
  {
    path: "new",
    component: CarNewComponent
  },
  {
    path: "car/:user",
    component: UserPageComponent
  },
  {
    path: "car/profile/:edit",
    component: UserEditComponent
  },
  {
    path: "car/edit/:id",
    component: EditCarComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
