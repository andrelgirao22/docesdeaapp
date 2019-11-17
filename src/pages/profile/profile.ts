import { API_CONFIG } from './../../config/api.config';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AccountService } from './../../services/domain/account.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  timeStamp
  cameraOn: boolean = false

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: LocalStorageService,
    public accountService: AccountService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public loadingController: LoadingController) {
      this.profileImage = 'assets/imgs/avatar-blank.png'
      this.timeStamp = (new Date()).getTime();
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
    
    this.accountService.findImage(this.account.id, "0").subscribe(res => {

      const blob = new Blob([res.body], { type: 'application/octet-stream' })
      let image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob))
      this.profileImage = image


    }, error => {
      this.profileImage = 'assets/imgs/avatar-blank.png'
    })
    
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

  getGalleryPicture() {

    this.cameraOn = true

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
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
    let loader=  this.presentLoading()
    this.accountService.sendImage(this.account.id, `0.png`, this.picture).subscribe(res => {
      this.picture = null
      this.timeStamp = (new Date()).getTime();
      this.getImageIfExists()
      loader.dismiss()
    }, error => {
      this.cameraOn = false
    })

  }

  presentLoading() {
    let loader = this.loadingController.create({
      content: 'Enviando foto...',
    });

    loader.present()
    return loader
  }

  cancelPicture() {
    this.picture = null
    this.cameraOn = false
  }

 

}
