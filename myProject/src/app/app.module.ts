import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { NavBarSearchComponent } from './components/navBarSearch/navBarSearch.component';
import { RegisterComponent } from './pages/register/register.component';
import { RouterModule } from '@angular/router';
import { ShopComponent } from './pages/shop/shop.component';
import { DetailProductComponent } from './pages/detail-product/detail-product.component';
import { PopupSuccessComponent } from './components/popupSuccess/popupSuccess.component';
import { PopupErrorComponent } from './components/popupError/popupError.component';

import { AuthGuard } from './auth.guard';
import { AuthService } from './service/authService/auth.service';
import { ListProductTrendComponent } from './components/listProductTrend/listProductTrend.component';
import { CartComponent } from './pages/cart/cart.component';
import { UserComponent } from './pages/user/user.component';
import { User_infoComponent } from './components/user_info/user_info.component';
import { User_ordersComponent } from './components/user_orders/user_orders.component';
@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    NavBarSearchComponent,
    RegisterComponent,
    ShopComponent,
    DetailProductComponent,
    PopupSuccessComponent,
    PopupErrorComponent,
    ListProductTrendComponent,
    CartComponent,
    UserComponent,
    User_infoComponent,
    User_ordersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
