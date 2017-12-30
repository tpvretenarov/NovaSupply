import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  products: Product[];
  product: Product;
  productid: string = localStorage['keyID'];

  constructor(private productService: ProductService) { }
  
    ngOnInit() {
      this.productService.getProduct(this.productid).subscribe(item => {
        this.product = item;
      });

      //this.product = this.productService.getProduct(this.productid);
      console.log(this.product);
    }

    //locateItem(){}
}





/*
$(document).ready(function() {
   $('.color-choose input').on('click', function() {
       var headphonesColor = $(this).attr('data-image');
  
       $('.active').removeClass('active');
       $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
       $(this).addClass('active');
   });
  
 });
*/