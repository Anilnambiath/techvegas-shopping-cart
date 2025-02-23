import { Component, OnInit } from '@angular/core';
import { ProductserviceService } from '../productservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css']
})
export class SearchListComponent implements OnInit {
  searchTerm: string = '';
  products: any[] = [];  
  product: any = null;

  constructor(
    private productService: ProductserviceService,
    private route: ActivatedRoute,
   private cartService: CartService
    
  ) {}

  ngOnInit(): void {
   
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['term'];
      if (this.searchTerm) {
        this.searchProducts(this.searchTerm);
      }
    });
  }

  
  searchProducts(term: string): void {
    this.productService.searchProducts(term).subscribe((data) => {
      this.products = data;  
    });
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
  }
}

