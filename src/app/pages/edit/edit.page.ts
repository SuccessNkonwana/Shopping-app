import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GroceryService } from 'src/app/services/grocery.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
objectA={
  name:'',
price:'',
type:'',
key:''
}

  item: any;
  private itemDoc: AngularFirestoreDocument<Item>;
  constructor(private grocery:GroceryService,private route:ActivatedRoute,private afs: AngularFirestore) { }
  update(){
     this.grocery.update(this.objectA,this.objectA.key);
     console.log("updated")
     
    }
    delete(){
      this.grocery.delete(this.objectA.key);
      console.log("deleted")
      this.objectA.name='';
      this.objectA.price='';
      this.objectA.type='';
     }
    
  // update(item){
  //   item.name="Mango";
  //   item.price=10;
  //   item.type="Fruits";
  //   this.itemDoc = this.afs.doc<Item>('Grocery/3AnqLWbS2SVh4rtDQSHv');
  //   this.itemDoc.update(item);
  // }
  ngOnInit() {
    this.route.queryParams.subscribe(data=>{
      console.log(data);
      this.objectA.name=data.name;
      this.objectA.price=data.price;
      this.objectA.type=data.type;
      this.objectA.key=data.key;
      // console.log(this.name);
      // this.price;
    })
    
  }

  

}
