import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'rxjs/add/operator/take';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}
  private create() {
    return this.db.list('shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getCart(cartId) {
    return this.db.object('/shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product, key) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('/shopping-carts/' + cartId + '/items/' + key);
    item$
      .valueChanges()
      .take(1)
      .subscribe((item: any) => {
        if (item) item$.update({ quantity: item.quantity + 1 });
        else item$.set({ product: product, quantity: 1 });
      });
  }
}
