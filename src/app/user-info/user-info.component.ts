import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  isNewUser = true;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:""};
  userInfo1: User;
  country_: string;
  address_: string;
  city_: string;
  province_: string;
  postalcode_: string;
  phone_: string;
  firstname_: string;
  lastname_: string;

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit() { }

  logout() {
    this.authService.signOut();
  }
  
  getUserInfo(){
    this.userService.getUser(this.authService.currentUserName).subscribe(item => {
      this.userInfo = item;
      
      this.firstname_ = item.FirstName;
      this.lastname_ = item.LastName;
      this.country_ = item.Country;
      this.address_ = item.Address;
      this.city_ = item.City;
      this.province_ = item.Province;
      this.postalcode_ = item.PostalCode;
      this.phone_ = item.PhoneNumber;
    });
  }

  updateUser(){
    this.userInfo.FirstName = this.firstname_;
    this.userInfo.LastName = this.lastname_;
    this.userInfo.Address = this.address_;
    this.userInfo.City = this.city_;
    this.userInfo.Province = this.province_;
    this.userInfo.Country = this.country_;
    this.userInfo.PostalCode = this.postalcode_;
    this.userInfo.PhoneNumber = this.phone_;
  }

  editUser(){
    this.updateUser();
    this.userService.editUser(this.userInfo, this.authService.currentUserName); 
  }

  addUser(){
    this.updateUser();
    console.log(this.authService.currentUserId);
    this.userService.addUser(this.userInfo, this.authService.currentUserName);
  }

}
