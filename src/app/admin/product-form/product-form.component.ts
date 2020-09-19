import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .get(id)
        .take(1)
        .subscribe(p => (this.product = p.payload.val()));
  }

  ngOnInit(): void {}
  save(product) {
    this.productService.create(product);
    this.router.navigate(['admin/products']);
  }
}
