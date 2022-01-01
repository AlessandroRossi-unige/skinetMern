import {BaseRepository} from "./base/BaseRepository";
import {Product} from "../../models/product";

export class ProductRepository extends BaseRepository<Product>{
  /*async createProduct(): Promise<Product>  {
    const newProduct = await this._collection.create()
    return await this._collection.
  }*/
}