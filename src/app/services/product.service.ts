import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product } from '../models/product';

@Injectable()
export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  product_: Product = { Name:"", Price:0, Details:"", Fabric:"", Information:"", Sizes:"", URL:""};
  temp: Observable<Product>;
  productID: string;
  productDoc: AngularFirestoreDocument<Product>;

  //constructor(public afs: AngularFirestore) {
    //this.product = this.afs.collection('Clothing').valueChanges(); //ValueChanges returns as Observable only (use snapShot for id) 
  //}

  //this constructor gets data throught the snapshot, making the document ID obtainable
  constructor(public afs: AngularFirestore) {
    this.productCollection = this.afs.collection('Clothing'); //OR this.afs.collection('Clothing', ref => ref.orderBy('Name', 'asc'));
    this.products = this.productCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    }); 
  }

  getAllProducts(){
    return this.products;
  }

  getProduct(itemID){
    this.productDoc = this.afs.doc(`Clothing/${itemID}`);
    this.temp = this.productDoc.valueChanges();
    return this.temp;
  }

  findProduct(input: string){
    //this.product = this.afs.collection('Clothing', ref => ref.where(ref.id, '==', input));
    //Grab product from collection where name = input
  }

  //Make Admin only
  addProduct(item: Product){
    this.productCollection.add({
      'Name': item.Name, 
      'Price': item.Price, 
      'Details': item.Details, 
      'Fabric':item.Fabric, 
      'Information':item.Information, 
      'Sizes':item.Sizes, 
      'URL':item.URL
    });
  }

  //Make Admin only
  deleteItem(item: Product){
    this.productDoc = this.afs.doc(`Clothing/${item.id}`);
    this.productDoc.delete();
  }

}

/*
interface Product {
  id?:string;
  title?:string;
  price?:number;
}
*/