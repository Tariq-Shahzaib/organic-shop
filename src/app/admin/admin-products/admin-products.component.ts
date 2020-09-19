import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filtredProducts: any[];
  subscrition: Subscription;
  constructor(private productService: ProductService) {
    this.subscrition = this.productService
      .getall()
      .subscribe(
        products =>
          (this.filtredProducts = this.products = products.map(a => a))
      );
  }

  ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
  filter(query: String) {
    this.filtredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}
}
