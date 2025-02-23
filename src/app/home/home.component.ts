import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductserviceService } from '../productservice.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: string[] = [];
  searchTerm: string = '';
  products: any[] = []; 
  errorMessage: string = '';

  constructor(
    private productService: ProductserviceService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.errorMessage = `Error fetching categories: ${error.status} - ${error.statusText}`;
      }
    });
  }

  onCategoryClick(category: string): void {
    this.productService.getProductsByCategory(category).subscribe({
      next: (data) => {
        this.products = data;
        this.errorMessage = ''; 
      },
      error: (error) => {
        this.errorMessage = `Error fetching products: ${error.status} - ${error.statusText}`;
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search', this.searchTerm]);
    }
  }

  
  addToCart(product: any): void {
    this.cartService.addToCart(product);  
  }
}
