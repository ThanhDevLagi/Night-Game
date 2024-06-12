import { ProductInterface } from 'src/app/service/product/product-interface';
import { ProductService } from '../../service/product/product.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authService/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productAll: ProductInterface[] = [];
  setLoading: boolean = true;
  productsCategory1: ProductInterface[] = [];
  productsCategory2: ProductInterface[] = [];
  productBanner: ProductInterface[] = []
  categories: any[] = [];
  currentUser: any;

  constructor(private ProductService: ProductService, private authService: AuthService) { }

  ngOnInit() {
    this.loadCategories();
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  async loadCategories() {
    try {
      this.categories = await this.ProductService.getCategories("http://localhost:3000/categories");
      this.loadProducts();
    } catch (error) {
      console.error("Error loading categories", error);
    }
  }

  async loadProducts() {
    this.setLoading = true;
    try {
      setTimeout(async () => {
        this.productAll = await this.ProductService.getProductList("http://localhost:3000/products");
        this.productsCategory1 = this.productAll.filter(product => product.categoryId.includes(1));
        this.productsCategory2 = this.productAll.filter(product => product.categoryId.includes(2));
        const trendingProducts = this.productAll.filter(product => product.trend == 1);
        if (trendingProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * trendingProducts.length);
          const randomTrendingProduct = trendingProducts[randomIndex];
          this.productBanner = [randomTrendingProduct];
        } else {
          this.productBanner = [];
        }
        this.setLoading = false;
      }, 1000);
    } catch (error) {
      console.error("Error loading products", error);
    }
  }

  getCategoryNameById(categoryId: number): string {
    const category = this.categories.find(cat => cat.id == categoryId);
    return category ? category.name : '';
  }


  getDiscountPercentage(promotionalPrice: number, cornerPrice: number): number {
    return ((cornerPrice - promotionalPrice) / cornerPrice) * 100;
  }
}
