import { CartService } from './../services/domain/cart.service';
import { ItemService } from './../services/domain/item.service';
import { AuthInterceptorProvider } from './interceptors/auth-interceptor';
import { AccountService } from './../services/domain/account.service';
import { LocalStorageService } from './../services/local-storage.service';
import { AuthService } from './../services/auth.service';
import { CategoriaService } from './../services/domain/categoria.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { PayPal } from '@ionic-native/paypal/ngx';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ErrorInterceptorProvider } from './interceptors/error-interceptor';
import { ImageUtilService } from '../services/image-util.service';

import { TaxDeliveryService } from '../services/tax-delivery.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    LocalStorageService,
    AccountService,
    ItemService,
    CartService,
    ImageUtilService,
    TaxDeliveryService,
    PayPal
  ]
})
export class AppModule {}
