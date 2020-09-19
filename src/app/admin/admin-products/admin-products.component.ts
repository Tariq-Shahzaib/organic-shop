import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProductService } from 'src/app/product.service';
import { DataTableResource } from 'angular-4-data-table';
import { Product } from '../../models/product';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[];
  filtredProducts: any[];
  subscrition: Subscription;
  tableResource: DataTableResource<any>;
  items: any[];
  itemCount: number;
  constructor(private productService: ProductService) {
    this.subscrition = this.productService.getall().subscribe(products => {
      this.filtredProducts = this.products = products.map(a => a);
      this.intializeTable(products);
    });
  }

  private intializeTable(products) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) return;
    this.tableResource.query(params).then(items => (this.items = items));
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
