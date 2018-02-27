import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  private userDoc: AngularFirestoreDocument<User>;
  obUsers_: Observable<User[]>;
  obUser_: Observable<User>;
  userID_: String;
  userInfo_: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:""};

  UserState: any = null;

  constructor( public afs: AngularFirestore) {
    this.loadCollection();
   }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //Getting Data from database
  //This function gets the collection from the database
  private loadCollection(){ this.userCollection = this.afs.collection('Users'); }
  
  private loadUsers(){
    //get all user documents from the collection throught the snapshot, making the document ID obtainable
    this.obUsers_ = this.userCollection.snapshotChanges().map(changes => { 
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  
    //this.obvProds = this.afs.collection('Users').valueChanges(); //ValueChanges returns as Observable only (use snapShot for id) 
  }

  //--------------------------------------------------------------------------------------------------------------------------------------
  //Adding a user
  addUser(user: User, UID){
    this.userCollection.doc(UID).set({
      'FirstName': user.FirstName,
      'Email': user.Email,
      'LastName': user.LastName,
      'Address': user.Address,
      'City': user.City,
      'Province': user.Province,
      'Country': user.Country,
      'PostalCode': user.PostalCode,
      'PhoneNumber': user.PhoneNumber
    });
  }

  //Edit User profile
  editUser(user: User, UID){
    this.userDoc = this.afs.doc(`Users/${UID}`);
    this.userDoc.update(user);
  }

  //Getting User information
  getUser(email){
    this.userDoc = this.afs.doc(`Users/${email}`);
    this.obUser_ = this.userDoc.valueChanges();
    return this.obUser_;
  }


}
