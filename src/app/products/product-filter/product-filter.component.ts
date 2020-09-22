import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$ = [];
  @Input('category') category;
  constructor(categoryService: CategoryService) {
    categoryService
      .getCategories()
      .subscribe(a => a.map(a => this.categories$.push(a.key)));
  }

  ngOnInit(): void {}
}
