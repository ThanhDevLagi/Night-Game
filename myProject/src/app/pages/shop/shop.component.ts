import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product/product.service';
import { ProductInterface } from '../../service/product/product-interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  productAll: ProductInterface[] = [];
  setLoading: boolean = true;
  productTrend: ProductInterface[] = [];
  categories: any[] = [];
  selectedCategoryId: number | null = null;
  filteredProducts: ProductInterface[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  async loadProducts() {
    this.setLoading = true;
    try {
      setTimeout(async () => {
        this.productAll = await this.productService.getProductList('http://localhost:5000/api/products');
        this.filteredProducts = this.productAll; // Initialize filteredProducts with all products
        this.productTrend = this.productAll.filter((item) => item.trend == 1);
        this.setLoading = false;
      }, 1000);
    } catch (error) {
      console.error('Error loading products', error);
    }
  }

  async loadCategories() {
    try {
      this.categories = await this.productService.getCategories('http://localhost:5000/api/categories');
      console.log(this.categories);
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }

  getCategoryNameById(categoryIds: number[]): string {
    let categoryNames: string[] = [];
    categoryIds.forEach((categoryId) => {
      const category = this.categories.find((cat) => cat.id == categoryId);
      if (category) {
        categoryNames.push(category.name);
      }
    });
    return categoryNames.join(', ');
  }

  getDiscountPercentage(promotionalPrice: number, cornerPrice: number): number {
    return ((cornerPrice - promotionalPrice) / cornerPrice) * 100;
  }

  filterProductsByCategory() {
    if (this.selectedCategoryId != null) {
      const categoryId = Number(this.selectedCategoryId);
      console.log('Selected Category ID:', categoryId);

      // Lọc sản phẩm dựa trên categoryId
      this.filteredProducts = this.productAll.filter(item => {
        console.log('Product:', item);
        console.log('Category IDs:', item.categoryId);

        // Kiểm tra xem categoryId của sản phẩm có chứa selectedCategoryId không
        const isCategoryMatch = item.categoryId.includes(categoryId);
        console.log('Is Category Match:', isCategoryMatch);
        return isCategoryMatch;
      });

      console.log('Filtered Products:', this.filteredProducts);
    } else {
      this.filteredProducts = this.productAll;
    }
  }


}
