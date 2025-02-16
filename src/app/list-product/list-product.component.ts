import { ApiService } from './../api.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud-operations/crud.service';
import { ProductDetails, ProductDetailsResponse, BaseApiResponse } from '../api-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent implements OnInit {

  productList: ProductDetails[] | any;

  constructor(private _crudService: CrudService,
              private router: Router) {
    console.log('ListProductComponent constructor called');
  }

  ngOnInit(): void {
    console.log("Grish Shrestha")
    this.getProduct();
  }

  getProduct(): void {
    console.log("ranjan")
    this._crudService.getProductDetails().subscribe((res) => {
      if (res.ok) {
        this.productList = res.body?.details?.products;
        console.log(this.productList);
      } else {
        console.log("Error occurs");
      }
    });
  }

  deleteProduct(productId: number): void {
    try {
      this._crudService.deleteProduct(productId).subscribe((response) => {
        if (response.ok) {
          alert("Successfully Deleted Product");
          window.location.reload();
        } else {
          alert("Failed To Delete Product");
        }
      });
    } catch (err) {
      console.log(err);
    }
  }
  updateProduct(product: ProductDetails): void {
    this.router.navigate([`/home/update-product/${product.productId}`], {
      state: { productDetails: product }
    });
  }
}
