import { Subscription } from 'rxjs/Subscription';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route:ActivatedRoute, 
    productService: ProductService, 
    private shoppingCartService: ShoppingCartService
  ) {
    
    
    productService.getAll()
      .switchMap(products => {
        this.products = products;
        return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
  
        this.filteredProducts = (this.category) ? 
          this.products.filter(p => p.category === this.category) : this.products;
      });
    
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(cart => this.cart = cart);
    console.log('cart', this.cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /* when we have more than one observable we can use switch map operator -
       code before switch map operator looks as follows

  productService.getAll().subscribe(products => {
    this.products = products;

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = (this.category) ? 
        this.products.filter(p => p.category === this.category) : this.products;
    });
  });
  
  */

  

}
