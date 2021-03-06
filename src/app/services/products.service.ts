import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  loading = true;
  products : Product[] = [];
  productsFiltered : Product[] = [];

  constructor( private http: HttpClient) {
    this.loadProducts();
  }

  private loadProducts() {

    return new Promise( ( resolve, reject ) => {
      this.http.get("https://portfolio-angular-43274-default-rtdb.firebaseio.com/products_idx.json")
      .subscribe( ( response: Product[] ) => {
        this.products = response;
        this.loading = false;

        // setTimeout( () => {
        //   this.loading = false;
        // }, 2000);

        resolve;
      })
    })
  }

  public getProduct( id : string ){
    return this.http.get(`https://portfolio-angular-43274-default-rtdb.firebaseio.com/products/${ id }.json`);
  }

  public searchProducts( input : string ){

    if(this.products.length <= 0){
      // Load products
      this.loadProducts().then( () => {
        this.applyFilter(input);
      });
    }
    else{
      // Apply filter
      this.applyFilter(input);
    }

  }

  private applyFilter( input : string ){
    this.products.forEach( product => {
      const tituloLowCase = product.titulo.toLowerCase();

      if( product.categoria.indexOf(input) >= 0 || tituloLowCase.indexOf(input) >= 0 ){
        this.productsFiltered.push(product);
      }
    });
  }
}
