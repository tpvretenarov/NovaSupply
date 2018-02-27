import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Product, Order } from '../models/product';

@Injectable()
export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;
  obvProds: Observable<Product[]>;
  product_: Product = { Name:"", Price:0, Details:"", Fabric:"", Information:"", Sizes:"", URL:""};
  obvProd: Observable<Product>;
  productID: string;
  productDoc: AngularFirestoreDocument<Product>;

  //constructor(public afs: AngularFirestore) {
    //this.product = this.afs.collection('Clothing').valueChanges(); //ValueChanges returns as Observable only (use snapShot for id) 
  //}


  //this constructor uses functions to get data from the firestore 
  constructor(public afs: AngularFirestore) {
    this.loadCollection(); //get collection from firestore
    this.loadProducts(); //get all documents from the collection
  }

  //This function gets the collection from the database
  private loadCollection(){ this.productCollection = this.afs.collection('Clothing'); }
  
  private loadProducts(){
    //get all documents from the collection throught the snapshot, making the document ID obtainable
    this.obvProds = this.productCollection.snapshotChanges().map(changes => { 
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  

  orderCollection(order: Order){ //
    //Check if the user is trying to sort by a clothing type
    if(order.field.substring(0, 7) == "Category"){
      var cType = order.field.substring(9); //In the case of 'category' being "Type", then extract the specified clothing type
      this.productCollection = this.afs.collection('Clothing', ref => ref.where("Category", "==", cType));
    
    } else {
    
      if (order.order == "asc"){
        this.productCollection = this.afs.collection('Clothing', ref => ref.orderBy(order.field, 'asc'));
      } else if  (order.order == "desc"){
        this.productCollection = this.afs.collection('Clothing', ref => ref.orderBy(order.field, 'desc'));
      }
    }
    
    this.loadProducts(); //To ensure everything loads properly, re-load products 
  }


  getAllProducts(){
    return this.obvProds;
  }

  getProduct(itemID){
    this.productDoc = this.afs.doc(`Clothing/${itemID}`);
    this.obvProd = this.productDoc.valueChanges();
    return this.obvProd;
  }

  findProduct(input: string){
    this.productCollection = this.afs.collection('Clothing', ref => ref.where("Name", '==', input));
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