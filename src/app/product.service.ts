import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list('/products').push(product);
  }

  getall() {
    return this.db.list('/products').snapshotChanges();
  }

  get(productId) {
    return this.db.object('/products/' + productId).snapshotChanges();
  }
}
