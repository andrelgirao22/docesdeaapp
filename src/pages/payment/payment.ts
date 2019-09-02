import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  order: OrderDTO

  parcelas: number[] = [1,2,3,4,5,6,7,8,9,10]

  formGroup: FormGroup

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.order = this.navParams.get('order')

      this.formGroup = this.formBuilder.group({
        paymentType: ["DINHEIRO", Validators.required],
        quota: [1, Validators.required],
        value: [0]
      })

  }

  ionViewDidLoad() {

  }

  nextPage() {

    this.order.payments = [{
      id: null,
      paymentType: this.formGroup.get('paymentType').value,
      quota: this.formGroup.get('quota').value,
      value: this.order.orderValue
    }]
    this.navCtrl.setRoot('OrderConfirmationPage', {order :this.order})
  }

}
