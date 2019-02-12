import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemService } from '../../services/domain/item.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  categorias: CategoriaDTO[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public itemService: ItemService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(res => {
      this.categorias = res
    })
  }

  showItems(categoria_id: string) {
    this.navCtrl.push('ItemPage', {categoria_id: categoria_id})
  }

}
