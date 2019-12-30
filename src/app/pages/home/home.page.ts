import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ProductService } from 'src/app/sdk/custom/product.service';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/sdk/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private productService: ProductService,
    private navController: NavController,
    private authService: AuthService,
  ) { }

  loading = false;
  products: Products[] = [];
  skeletonlist = [1, 2, 3, 4, 5];

  ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.loading = true;
    const observable = await this.productService.getAllProducts();
    observable.subscribe(
      data => {
        this.products = data.data.docs;
        console.log('data aa gya hy', data);
        this.loading = false;
      },
      err => {
        console.log('err aa agi hy zalim', err);
      }
    );
  }

  getDetails(product) {
    this.productService.selectedProduct = product;
  }

  async onCartClick() {
    const token = await this.authService.getTokenFromStorage();
    if (token == null) {
      this.navController.navigateRoot('/login');
    }
  }
}

interface Products {
  name: string;
  size: string;
  quantity: string;
  category: string;
  is_deleted: boolean;
}
