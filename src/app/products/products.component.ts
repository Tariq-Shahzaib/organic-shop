import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import 'rxjs/add/operator/map';
import { ShoppingCartService } from '../shopping-cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any = [];
  productsForFilration: any = [];
  category;
  allProducts = [];
  filtredProducts;
  categories$: any = [];
  cart: any;
  subscription: any;
  constructor(
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService
  ) {
    productService.getall().subscribe(data => {
      data.map(a => this.allProducts.push(a));
    });

    productService.getall().subscribe(data => {
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
  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
      .snapshotChanges()
      .subscribe(cart => (this.cart = cart.payload.val()));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
