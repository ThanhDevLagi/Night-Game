import { CartService } from 'src/app/service/cart/cart.service';
import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/service/authService/auth.service';
import { ProductInterface } from 'src/app/service/product/product-interface';
import { ProductService } from 'src/app/service/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navBarSearch',
  templateUrl: './navBarSearch.component.html',
  styleUrls: ['./navBarSearch.component.css']
})
export class NavBarSearchComponent implements OnInit {
  productCart: any;
  currentUser: any;
  SearchF: FormGroup = new FormGroup({});
  results: ProductInterface[] = [];
  isDivVisible: boolean = false;
  orderLength:number = 0;
  orderChangeSubscription: Subscription | undefined;
  constructor(private productService: ProductService, private authService: AuthService, private router: Router, private elementRef: ElementRef, private cartService:CartService) { }

  ngOnInit() {
    this.productCart = this.productService.getCartLength();
    this.currentUser = this.authService.getUser();
    this.SearchF = new FormGroup({
      search: new FormControl('', Validators.required),
    });

    this.SearchF.get('search')!.valueChanges.pipe(debounceTime(500), switchMap(value => this.productService.getProductSearch(value))).subscribe(data => {
      this.results = data;
      this.isDivVisible = this.results.length > 0;
    });
    if (this.currentUser) {
      this.cartService.getOrder(this.currentUser.id).subscribe(order => {
        if (order && order.products) {
          this.orderLength = order.products.length;
        }
      });

      this.orderChangeSubscription = this.cartService.getOrderChanges().subscribe(order => {
        if (order && order.user_id === this.currentUser.id) {
          this.orderLength = order.products.length;
        }
      });
    }
  }


  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isDivVisible = false; // Hide the div
    }
  }
}
