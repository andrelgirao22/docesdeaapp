import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderDTO } from '../../models/order.dto';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';

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
    public formBuilder: FormBuilder,
    public payPal: PayPal) {

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

    if(this.order.payments[0].paymentType === "DINHEIRO") {
      this.navCtrl.setRoot('OrderConfirmationPage', {order :this.order})
    } else {
      this.handlePayment()
    }
    
  }

  handlePayment() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }

}
