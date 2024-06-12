import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './auth.guard';
import { UserComponent } from './pages/user/user.component';
import { User_infoComponent } from './components/user_info/user_info.component';
import { User_ordersComponent } from './components/user_orders/user_orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'shop', component: ShopComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product/:id', component: DetailProductComponent },
  {
    path: 'user', component: UserComponent, children: [
      {path: '', component: User_infoComponent},
      {path: 'info', component: User_infoComponent},
      {path: 'orders', component: User_ordersComponent}
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
