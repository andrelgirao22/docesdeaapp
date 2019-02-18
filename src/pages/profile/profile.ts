import { API_CONFIG } from './../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AccountService } from './../../services/domain/account.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccountDTO } from '../../models/acount.dto';
import { DomSanitizer } from '@angular/platform-browser';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  account: AccountDTO
  picture: string
  profileImage
  cameraOn: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: LocalStorageService,
    public accountService: AccountService,
    public camera: Camera,
    public sanitizer: DomSanitizer) {
      this.profileImage = 'assets/imgs/avatar-blank.png'
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let token = this.storage.getLocalUser();
    if (token) {
      let email = token.email;
      this.accountService.findlByEmail(email).subscribe(res => {
        this.account = res;
        this.getImageIfExists()
      }, error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists() {

    if(this.account.imageUrl) {
      this.profileImage = this.account.imageUrl
      console.log('profileImage', this.profileImage)
    } else {
      this.profileImage = 'assets/imgs/avatar-blank.png'
    }
    
  }

  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader()
      reader.onerror = reject
      reader.onload = e => fulfill(reader.result)
      reader.readAsDataURL(blob)
    })
  }

  getCameraPicture() {

    this.cameraOn = true

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then(imageData => {
     this.picture = 'data:image/png;base64,' + imageData;
     this.cameraOn = false
    }, err => {
      this.cameraOn = false
    });
  }

  sendPicture() {
    this.accountService.uploadPicture(this.picture, this.account.id).subscribe(res => {
      this.picture = null
      this.loadData()
    }, error => {
      this.cameraOn = false
    })
  }

  cancelPicture() {
    this.picture = null
    this.cameraOn = false
  }

 

}
