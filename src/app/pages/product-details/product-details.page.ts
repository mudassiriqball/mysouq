import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/sdk/custom/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  constructor(
    private productService: ProductService,
    ) { }

  product: any;

  ngOnInit() {
    this.product = this.productService.selectedProduct;
  }

}
