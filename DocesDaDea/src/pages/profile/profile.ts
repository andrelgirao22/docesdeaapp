import { AccountService } from './../../services/domain/account.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountDTO } from '../../models/acount.dto';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: AccountDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: LocalStorageService,
    public accountService: AccountService) {
  }

  ionViewDidLoad() {
    let token = this.storage.getLocalUser()
    if(token) {
      let email = token.email
      this.accountService.findlByEmail(email).subscribe(res => {
        this.account = res
        
      }, error => {
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage')
        }
      })
    } else {
      this.navCtrl.setRoot('HomePage')
    }
  }

}
