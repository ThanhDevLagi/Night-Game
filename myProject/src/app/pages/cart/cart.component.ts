import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentUser: any;
  cartItem: any;
  categories: any[] = [];
  showSuccessPopup:boolean = false;
  textSuccsessMessage:string = '';
  successMessage:string = '';
  showErrorPopup:boolean = false;
  textMessage:string = ''
  errorMessage:string = '';
  constructor(private authService: AuthService, private cartService: CartService, private productService: ProductService) { }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadCartItem();
  }

  loadCartItem() {
    if (this.currentUser) {
      this.cartService.getOrderCartPending(this.currentUser.id).subscribe(async order => {
        if (order) {
          this.cartItem = order;
          this.cartItem.total = this.cartItem.products.reduce((acc: number, product: any) => acc + (product.price * product.quantity), 0);
          console.log(this.cartItem);
          await this.loadCategories();
        }else{
          this.cartItem = null;
        }
      });
    }
}
  increaseQuantity(product: any) {
    product.quantity++;
    this.updateCart();
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.updateCart();
    }
  }

  removeProduct(product: any) {
    const index = this.cartItem.products.indexOf(product);
    if (index > -1) {
      this.cartItem.products.splice(index, 1);
      this.updateCart();
    }
  }

  async loadCategories() {
    try {
      this.categories = await this.productService.getCategories("http://localhost:5000/api/categories");
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  }

  getCategoryNameById(categoryIds: number[]): string {
    if (!this.categories || this.categories.length === 0) {
      return '';
    }

    let categoryNames: string[] = [];
    categoryIds.forEach(categoryId => {
      const category = this.categories.find(cat => cat.id == categoryId);
      if (category) {
        categoryNames.push(category.name);
      }
    });
    return categoryNames.join(', ');
  }

  updateCart() {
    this.cartItem.total = this.cartItem.products.reduce((acc: number, product: any) => acc + (product.price * product.quantity), 0);
    this.cartService.updateOrder(this.cartItem).subscribe(updatedOrder => {
      console.log('Order updated:', updatedOrder);
    });
  }

  completeOrder(): void {
    if (this.currentUser && this.cartItem && this.cartItem.id) {
      this.cartService.updateOrderStatus(this.cartItem.id, 'waiting').subscribe(
        response => {
          console.log('Order status updated to waiting:', response);
          this.showSuccessPopup = true;
          this.textSuccsessMessage = "Đã hoàn thành thanh toán";
          this.successMessage = "Xin bạn hãy vào giỏ hàng để kiểm tra trạng thái đơn hàng";

          this.loadCartItem();
        },
        error => {
          console.error('Failed to update order status:', error);
          this.showErrorPopup = true;
          this.textMessage = "Cập nhật trạng thái đơn hàng thất bại";
          this.errorMessage = 'Xin mời bạn hãy thử lại';
        }
      );
    }
}




}
