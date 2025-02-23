import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  searchTerm: string = '';  
  showDropdown: boolean = false;  
  cartCount: number = 0; 

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      
      this.router.navigate(['/search'], {
        queryParams: { term: this.searchTerm },
      });
    }
  }

  signOut(): void {
   
    console.log('User signed out');
  }
}
