import {Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../../models/products/product';
import * as firebase   from 'firebase';

@Injectable()
export class ProductListService{

    private ProductListReference = this.Database.list<Product>('product-list');
    private ClientListReference = this.Database.list<Product>('client-product-list');
    
    constructor(private Database: AngularFireDatabase){
       
    }
    addProduct(product: Product)
    {
        return this.ClientListReference.push(product);
    }

    editProduct(product: Product)
    {
        return this.ProductListReference.update(product.key, product);
    }
    
    deleteProduct(product: Product)
    {
        return this.ProductListReference.remove(product.key);
    }

   
}