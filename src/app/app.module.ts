import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ShopComponent } from './shop/shop.component';


import { ProductService } from './services/product.service'


import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';

//For Firebase
import { environment } from '../environments/environment'
import { AngularFireModule} from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

const appRoutes: Routes = [
  {path:'', component:IndexComponent},
  {path:'shop', component:ShopComponent},
  {path:'form', component:FormComponent},
  {path:'item', component:ItemComponent},
  {path:'add', component:AddItemComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ShopComponent,
    FormComponent,
    NavbarComponent,
    AddItemComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'NovaSupply'),
    AngularFirestoreModule,
    BsDropdownModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})

export class AppModule { }
