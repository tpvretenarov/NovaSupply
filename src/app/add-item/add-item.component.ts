import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  items: Product[];
  product: Product = { Name:"", Price:0, Details:"", Fabric:"", Information:"", Sizes:"", URL:""};

  Name: string;
  Price: number;
  Details: string;
  Fabric: string;
  Information: string;
  Sizes: string;
  URL:string;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe(items => {
      //console.log(items);
      this.items = items;
    });
  }

  addItem() {
    this.product.Name = this.Name;
    this.product.Information = this.Information;
    this.product.Price = this.Price;
    this.product.Details = this.Details;
    this.product.Fabric = this.Fabric;
    this.product.URL = this.URL;
    this.product.Sizes = this.Sizes;

    //console.log(this.Name);

    this.productService.addProduct(this.product);
  }

}
