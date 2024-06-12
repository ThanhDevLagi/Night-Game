import { Component, OnInit } from '@angular/core';
import { ProductInterface } from 'src/app/service/product/product-interface';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-listProductTrend',
  templateUrl: './listProductTrend.component.html',
  styleUrls: ['./listProductTrend.component.css']
})
export class ListProductTrendComponent implements OnInit {
  productTrend: ProductInterface[] = []
  constructor(private ProductService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }
  async loadProducts() {
    this.productTrend = await this.ProductService.getProductList("http://localhost:3000/products?trend=1")
  }
}
