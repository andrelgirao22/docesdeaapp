import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyOrdersPage } from './my-orders';
import { OrderService } from '../../services/domain/order.service';

@NgModule({
  declarations: [
    MyOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyOrdersPage),
  ],
  providers: [
    OrderService
  ]
})
export class MyOrdersPageModule {}
