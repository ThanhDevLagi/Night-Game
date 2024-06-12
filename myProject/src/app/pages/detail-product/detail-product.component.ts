import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/authService/auth.service';
import { ProductService } from 'src/app/service/product/product.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  productDetail: any;
  categories: any[] = [];
  currentUser: any;
  setLoading: boolean = true;
  showSuccessPopup: boolean = false;
  showErrorPopup: boolean = false;
  textSuccsessMessage: string = '';
  successMessage: string = '';
  textMessage: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadDetailProduct(params.get('id'));
    });
    this.loadCategories();
    this.currentUser = this.authService.getUser();
  }

  async loadDetailProduct(id: string | null) {
    this.setLoading = true;
    try {
      if (id) {
        this.productDetail = await this.productService.getProductByID(`http://localhost:3000/products/${id}`);
      }
      this.setLoading = false;
    } catch (error) {
      console.log(error);
    }
  }

  async loadCategories() {
    try {
      this.categories = await this.productService.getCategories("http://localhost:3000/categories");
    } catch (error) {
      console.error('Failed to load categories', error);
    }
  }

  getCategoryNameById(categoryIds: number[]): string {
    let categoryNames: string[] = [];
    categoryIds.forEach(categoryId => {
      const category = this.categories.find(cat => cat.id == categoryId);
      if (category) {
        categoryNames.push(category.name);
      }
    });
    return categoryNames.join(', ');
  }

  addCart(quantity: string): void {
    if (!this.currentUser) {
      this.showErrorPopup = true;
      this.textMessage = "Vui lòng đăng nhập để mua hàng";
      return;
    }

    const price = this.productDetail.promotionalPrice > 0 ? this.productDetail.promotionalPrice : this.productDetail.cornerPrice;
    const product = {
      id: this.productDetail.id,
      name: this.productDetail.name,
      img: this.productDetail.img,
      categoryId: this.productDetail.categoryId,
      price: price,
      quantity: +quantity
    };
    console.log(this.currentUser.id);

    this.cartService.getOrderCartPending(this.currentUser.id).subscribe(order => {
      if (order && order.id) {
        if (!order.products) {
          order.products = [];
        }

        const existingProduct = order.products.find((p: any) => p.id == product.id);

        if (existingProduct) {
          existingProduct.quantity += +quantity;
        } else {
          order.products.push(product);
        }

        order.total = order.products.reduce((acc: number, p: any) => acc + (p.price * p.quantity), 0);

        this.cartService.updateOrder(order).subscribe(
          updatedOrder => {
            console.log('Order updated:', updatedOrder);
            this.showSuccessPopup = true;
            this.textSuccsessMessage = "Đã cập nhật lại thành công";
            this.successMessage = "Xin bạn hãy vào giỏ hàng để thanh toán";
          },
          error => {
            console.error('Failed to update order:', error);
            this.showErrorPopup = true;
            this.textMessage = "Cập nhật đơn hàng thất bại";
          }
        );
      } else {
        const newOrder = {
          user_id: this.currentUser.id,
          total: product.price * +quantity,
          status: 'pending',
          products: [product]
        };

        this.cartService.addOrder(newOrder).subscribe(
          newOrderResponse => {
            console.log('New order created:', newOrderResponse);
            this.showSuccessPopup = true;
            this.textSuccsessMessage = "Đã Thêm vào giỏ hàng thành công";
            this.successMessage = "Xin bạn hãy vào giỏ hàng để thanh toán";
          },
          error => {
            console.error('Failed to create order:', error);
            this.showErrorPopup = true;
            this.textMessage = "Tạo đơn hàng mới thất bại";
          }
        );
      }
    });
}




  trustUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
