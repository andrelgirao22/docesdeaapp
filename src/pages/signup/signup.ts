import { AccountService } from './../../services/domain/account.service';
import { CityDTO } from './../../models/city.dto';
import { StateDTO } from './../../models/state.dto';
import { CityService } from './../../services/domain/city.service';
import { StateService } from './../../services/domain/state.service';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AccountDTO } from '../../models/acount.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup
  estados: StateDTO[]
  cidades: CityDTO[]

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public stateService: StateService,
    public cityService: CityService,
    public accountService: AccountService) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        passwordConfirmation: ['', Validators.required],
        address: new FormGroup({
          addressName: new FormControl('', [Validators.required]),
          addressNumber:new FormControl('', [Validators.required]),
          neighborhood: new FormControl('', [Validators.required]),
          postalCode: new FormControl('', [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          complement: new FormControl('')
        })
      }, {validator: SignupPage.equalsTo})
  }


  static equalsTo(group: AbstractControl): {[key:string]:boolean} {
    const password = group.get('password')
    const passwordConfirmation = group.get('passwordConfirmation')
    console.log('equalsTo')
    if(!password || !passwordConfirmation) {
      return undefined
    }

    if(password.value !== passwordConfirmation.value) {
      return {passwordsIsNotMath:true}
    }

    return undefined
  }

  ionViewDidLoad() {
    this.stateService.findAll().subscribe(res => {
      this.estados = res
      this.formGroup.get('address.state').setValue(this.estados[0]);
      this.updateCidades()
    }, error =>{})
  }

  updateCidades() {
    let state: any = this.formGroup.get('address.state').value
    this.cityService.findCities(state).subscribe(res => {
      this.cidades = res
      this.formGroup.get('address.city').setValue(null);
    }, error => {})
  }

  signupUser() {
    let account: AccountDTO = this.formGroup.value;
    account.addresses = [this.formGroup.value.address]
    this.accountService.insert(account).subscribe(res=> {
      this.showInsertOk()
    }, error=>{})
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message:'Registro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () =>{
            this.navCtrl.push('HomePage', { newEmail: this.formGroup.value.email })
          }
        }
      ]
    })

    alert.present()
  }

}
