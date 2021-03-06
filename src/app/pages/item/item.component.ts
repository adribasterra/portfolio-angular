import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service'
import { ProductDescription } from '../../interfaces/product-description.interface'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product : ProductDescription;
  id : string;

  constructor( private router: ActivatedRoute,
               public productsService : ProductsService ) { }

  ngOnInit(): void {

    this.router.params.subscribe( params => {
      console.log(params);
      this.productsService.getProduct(params['id'])
        .subscribe (( product : ProductDescription ) => {
          this.id = params['id'];
          this.product = product;
          console.log(product);
        })
    });
  }

}
