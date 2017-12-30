import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  items: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(items => {
      //console.log(items);
      this.items = items;
    });
  }


  
  displayItem(item){
    //console.log(item);
    localStorage['keyID'] = item.id;
  }


  //Figure out how to make this admin-only
  //deleteItem(event, item){
  //  this.productService.deleteItem(item);
  //}

}
