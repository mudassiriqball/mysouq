
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ProductService } from '../../../../sdk/custom/product.service';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  images: any;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private productService: ProductService,
    private imagePicker: ImagePicker,
    // private camera: Camera
  ) { }

  addNewProductForm: FormGroup;
  loading = false;
  @Input() product;
  ngOnInit() {
    this.formInitializer();
    if (this.product) {
      console.log('got product', this.product);
      this.addNewProductForm.patchValue(this.product);
    }
  }

  formInitializer() {
    this.addNewProductForm = this.formBuilder.group({
      _id: [null],
      name: [null, [Validators.required]],
      size: [null],
      quantity: [null, [Validators.required]],
      category: [null, [Validators.required]],
      is_deleted: [false, [Validators.required]],
      image_url: [''],
    });
  }

  getPictures() {
    this.imagePicker.getPictures({ outputType: 1 }).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      console.log("errrrrrr:", err);
    });
  }
  
  // getImage() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     // If it's base64 (DATA_URL):
  //     let base64Image = 'data:image/jpeg;base64,' + imageData;
  //   }, (err) => {
  //     console.log("Camera error:", err);
  //   });
  // }
  // getImage() {
  //   var control = this;
  //   const options: CameraOptions = {
  //     quality: 70,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     saveToPhotoAlbum: false
  //   }

  //   this.camera.getPicture(options).then(imageData => {
  //     control.shopPhoto = 'data:image/jpeg;base64,' + imageData;
  //   },
  //     err => {
  //       alert('error: ' + err)
  //     });
  // }

  async addNew() {
    const observable = await this.productService.addNewProduct(
      this.addNewProductForm.value
    );
    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewProductForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been added successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewProductForm.reset();
        //optional
        // this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }
  async updateProduct() {
    const observable = await this.productService.updateProduct(
      this.addNewProductForm.value
    );

    observable.subscribe(
      async data => {
        console.log('got response from server', data);
        const name = this.addNewProductForm.controls['name'].value;
        const toast = await this.toastController.create({
          message: `${name} has been updated successfully.`,
          duration: 3500
        });
        toast.present();
        this.loading = false;
        this.addNewProductForm.reset();
        //optional

        this.modalCtrl.dismiss();
      },
      error => {
        this.loading = false;
        this.modalCtrl.dismiss();

        console.log('error', error);
      }
    );
  }

  save() {
    this.loading = true;

    if (this.product) {
      this.updateProduct();
    } else {
      this.addNew();
    }
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
