import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  getCustomers() {
    throw new Error("Method not implemented.");
  }
  customerSetSession(res: any) {
    throw new Error("Method not implemented.");
  }
  getSignInCustomer(id: any, pin: any) {
    throw new Error("Method not implemented.");
  }
list;
writePost;

private itemDoc: AngularFirestoreDocument<Item>;
  constructor(private firestore:AngularFirestore, private afs: AngularFirestore) { }
  // retrieve the list use:valueChanges()
  getItems(){
    return this.firestore.collection('Grocery').valueChanges();

  }
  // retrieve and manipulate the list use :snapshotChanges()
  getItems2(){
    return this.firestore.collection('Grocery').snapshotChanges();
    
   }
  post(item,alert){
    this.writePost=this.firestore.collection<any>('Grocery');
    this.writePost.add(item).then(()=>{
     console.log("successful")
  });
}
// update(item){
//   item.name="Mango";
//   item.price=10;
//   item.type="Fruits";
//   this.itemDoc = this.afs.doc<Item>('Grocery/3AnqLWbS2SVh4rtDQSHv');
//   this.itemDoc.update(item);
// }
add(item){
  this.writePost=this.firestore.collection<any>('Grocery');
  this.writePost.add(item).then(()=>{
   console.log("successful")
});
}
update(objectA,key){

  this.itemDoc = this.afs.doc<Item>('Grocery/'+key);
  this.itemDoc.update(objectA);
}
delete(key){

  this.itemDoc = this.afs.doc<Item>('Grocery/'+key);
  // this.itemDoc.update(objectA);
  this.itemDoc.delete();
 
}
}
