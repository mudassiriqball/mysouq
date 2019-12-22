import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AuthService } from './../../../sdk/core/auth.service';
import { ProductService } from '../../../sdk/custom/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vender-dashbord',
  templateUrl: './vender-dashbord.page.html',
  styleUrls: ['./vender-dashbord.page.scss'],
})
export class VenderDashbordPage implements OnInit {

  loading = false;
  deleteLoading = false;
  books: Products[] = [];
  bookIconPath = 'assets/icon/product.png';
  skeletonlist = [1, 2, 3, 4, 5];
  selectedBook: Products;
  constructor(
    private productService: ProductService,
    private modalController: ModalController,
    private alertController: AlertController,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.getAll();
  }

  async getAll() {
    this.loading = true;

    const observable = await this.productService.getAllProducts();
    observable.subscribe(
      data => {
        this.books = data.data.docs;
        this.loading = false;
        console.log('data', data);
      },
      err => {
        console.log('err', err);
      }
    );
  }

  openEditPopup(product: Products) {
    this.openAddModal(product);
  }

  async openAddModal(product?: Products) {
    const modal = await this.modalController.create({
      component: AddNewProductComponent,
      componentProps: { product }
    });
    modal.onDidDismiss().then(data => {
      console.log('dismissed', data);
      this.getAll();
    });
    await modal.present();
  }

  async delete(product) {
    this.selectedBook = product;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure you want to delete the product "${product.name}"`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.deleteBook();
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteBook() {
    this.deleteLoading = true;
    const observable = await this.productService.deleteProduct(
      this.selectedBook._id
    );

    observable.subscribe(
      data => {
        console.log('got response from server', data);
        this.deleteLoading = false;
        this.getAll();
      },
      error => {
        this.deleteLoading = false;
        console.log('error', error);
      }
    );
  }
}

// Intefacing is Optional

interface Products {
  name: string;
  ibn: string;
  _id?: string;
  image_url: string;
  author: string;
  is_deleted: boolean;
}
