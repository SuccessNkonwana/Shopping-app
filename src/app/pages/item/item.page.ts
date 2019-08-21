import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  //item object{}
  // array[]
item={
  name:'',
  price:0,
  type:'',
}
  constructor(public alert: AlertController, public service: GroceryService ) { }

submit(){
  this.service.post(this.item,this.alert)
}
  ngOnInit() {
  }

}
