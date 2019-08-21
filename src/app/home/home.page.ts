import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../services/grocery.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  item={
    name:'',
    price:0,
    type:'',
  }
groceryList;
itemList;
userEmail: string;
  constructor(private grocery:GroceryService,private route:Router,
    private navCtrl: NavController,
    private authService: AuthenticationService
    ) {
    // this.groceryList=this.grocery.getItems();
    this.grocery.getItems2().subscribe(data=>{
      this.itemList=data.map(e=>{
        return{
          key: e.payload.doc.id,
          ...e.payload.doc.data()
        }as Item;// the Item is the class name in the item.ts
      });
      console.log(this.itemList);
    });

  }
  // update(){
  //   this.grocery.update(this.item);
  // }
add(item){
  this.route.navigate(['/edit'],{queryParams:{name: item.name,price:item.price,type:item.type,key:item.key}})
}
ngOnInit(){
    
  if(this.authService.userDetails()){
    this.userEmail = this.authService.userDetails().email;
  }else{
    this.navCtrl.navigateBack('');
  }
}

logout(){
  this.authService.logoutUser()
  .then(res => {
    console.log(res);
    this.navCtrl.navigateBack('');
  })
  .catch(error => {
    console.log(error);
  })
}
}

