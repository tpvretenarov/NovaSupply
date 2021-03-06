import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';



@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent implements OnInit {

  isNewUser = true;
  email = '';
  password = '';
  errorMessage = '';
  error: { name: string, message: string } = { name: '', message: '' };

  UID: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  postalCode: string;
  province: string;
  addressLine: string;
  phoneNumber: string;

  resetPassword = false;

  authState: any = null;

  userInfo: User = { FirstName:"", Email:"", LastName:"", Address:"", City:"", Province:"", Country:"", PostalCode:"", PhoneNumber:""};

  constructor(private afAuth: AngularFireAuth, public authService: AuthService, private router: Router, private userService: UserService) { 

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  ngOnInit() { }


  getUserID(){
    return this.authState.uid;
  }

  updateUser(){
    this.userInfo.FirstName = this.firstName;
    this.userInfo.LastName = this.lastName;
    this.userInfo.Email = this.email;
    this.userInfo.Address = this.addressLine;
    this.userInfo.City = this.city;
    this.userInfo.Province = this.province;
    this.userInfo.Country = this.country;
    this.userInfo.PostalCode = this.postalCode;
    this.userInfo.PhoneNumber = this.phoneNumber;
  }

  addUser(){
    this.updateUser();
    console.log(this.authService.currentUserId);
    this.userService.addUser(this.userInfo, this.email);
  }

  editUser(){
    this.updateUser();
    this.userService.editUser(this.userInfo, this.UID); 
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      this.router.navigate(['/user'])
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  changeForm() {
    this.isNewUser = !this.isNewUser
  }

  onSignUp(): void {
    this.clearErrorMessage()
    this.addUser()
    if (this.validateForm(this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/user'])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  onLoginEmail(): void {
    this.clearErrorMessage()

    if (this.validateForm(this.email, this.password)) {
      this.authService.loginWithEmail(this.email, this.password)
        .then(() => this.router.navigate(['/user']))
        .catch(_error => {
          this.error = _error
          this.router.navigate(['/login'])
        })
    }
  }

  validateForm(email: string, password: string): boolean {
    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      return false
    }
    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      return false
    }
    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }
    if(password.search(/[a-z]/) < 0){
      this.errorMessage = "Password should have at least one lowercase letter!"
      return false
    }
    if(password.search(/[A-Z]/) < 0){
      this.errorMessage = "Password should have at least one uppercase letter!"
      return false
    }
    if(password.search(/[0-9]/) < 0){
      this.errorMessage = "Password should have at least one number!"
      return false
    }
    this.errorMessage = ''
    return true
  }

  isValidMailFormat(email: string) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if ((email.length === 0) && (!EMAIL_REGEXP.test(email))) {
      return false;
    }

    return true;
  }

  sendResetEmail() {
    this.clearErrorMessage()

    this.authService.resetPassword(this.email)
      .then(() => this.resetPassword = true)
      .catch(_error => {
        this.error = _error
      })
  }
}