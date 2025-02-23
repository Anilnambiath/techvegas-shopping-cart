import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductserviceService } from '../productservice.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  product: any = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductserviceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe({
        next: (data) => {
          this.product = data;
          this.errorMessage = null;
        },
        error: (err) => {
          this.errorMessage = err.message; 
        }
      });
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
