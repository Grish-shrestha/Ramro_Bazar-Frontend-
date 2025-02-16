import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ProductDetails, ProductDetailsResponse } from '../api-response';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private apiservice : ApiService) { }

  //Get All Products
  getProductDetails(){
    return this.apiservice.get<ProductDetailsResponse>('api/products');
  }

  //Get Product By Id
  getProductById(productId : number){
    return this.apiservice.get<ProductDetailsResponse>('api/products/' + productId) ;
  }

  //Add Product
  addProducts(
    addProduct : ProductDetails
  ): Observable<HttpResponse<ProductDetailsResponse>> {
    return this.apiservice.post('api/add-product', addProduct);
  }

  //Delete Product
  deleteProduct(productId: number): Observable<HttpResponse<any>> {
    return this.apiservice.post(`api/delete/products/${productId}`);
  }


  //Update Product
  // updateProduct(productId: number, productDto: ProductDetails) {
  //   const params = new HttpParams().set('id', productId.toString());
  //   return this.apiservice.put('/update/product', productDto, params);
  // }

  updateProduct(productId: number, productDto: ProductDetails): Observable<HttpResponse<ProductDetailsResponse>> {
    return this.apiservice.put(`/update/product/${productId}`, productDto);
  }

}
