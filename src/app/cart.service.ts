import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0); 

  cartCount$ = this.cartCount.asObservable(); 

  constructor() {}

  addToCart(item: any): void {
    this.cartItems.push(item);
    this.cartCount.next(this.cartItems.length); 
    alert('Item added to cart!');
  }

  getCartItems(): any[] {
    return this.cartItems;
  }
}
