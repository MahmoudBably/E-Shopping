import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../../models/products/product';
import * as firebase   from 'firebase';

@Injectable()
export class ProductListService{

    private ProductListReference = this.Database.list<Product>('product-list');
    
    
    constructor(private Database: AngularFireDatabase){
       
    }
    addProduct(product: Product)
    {
        return this.ProductListReference.push(product);
    }

    editProduct(product: Product)
    {
        return this.ProductListReference.update(product.key, product);
    }
    
    deleteProduct(product: Product)
    {
       // firebase.storage().ref().child('images/'+product.Image+'.jpg').delete();
        return this.ProductListReference.remove(product.key);
    }

    // getPhotoURL(){
    //     firebase.storage().ref().child('images/'+this.+'.jpg').getDownloadURL().then((url)=>{
    //       this.ProductPhoto = url;  
    //     });
    //   }

   
}