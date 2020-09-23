import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit
} from '@angular/core';
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
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) {}

  addToCart(product, key) {
    console.log(product, key);
    this.cartService.addToCart(product, key);
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.key];
    return item ? item.quantity : 0;
  }
}
