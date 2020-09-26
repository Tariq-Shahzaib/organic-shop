import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('key') key;
  @Input('show-actions') showActions = true;
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product, key) {
    console.log(product, key);
    this.cartService.addToCart(product, key);
  }
}
