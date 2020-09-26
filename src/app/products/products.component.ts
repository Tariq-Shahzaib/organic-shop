import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];
  productsForFilration: any = [];
  category;
  allProducts = [];
  filtredProducts;
  categories$: any = [];
  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {
    productService.getall().subscribe(data => {
      data.map(a => this.allProducts.push(a));
    });

    this.products = productService.getall().subscribe(data => {
      data.map(a => this.productsForFilration.push(a));

      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        this.filtredProducts = this.category
          ? this.productsForFilration.filter(
              p => p.payload.val().category === this.category
            )
          : this.allProducts;
      });
    });

    this.products = productService.getall();
  }
}
