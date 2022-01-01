import {IWrite} from "../interfaces/IWrite";
import {IRead} from "../interfaces/IRead";
import { Collection, Db  } from "mongodb";

export class BaseRepository<T> implements IWrite<T>, IRead<T>{
  public readonly _collection: Collection;
  
  constructor(db: Db, collectionName: string) {
    this._collection = db.collection(collectionName);
  }
  async create(item: T): Promise<boolean> {
    const result = await this._collection.insertOne(item);
    
    return result.acknowledged;
  }
  
  delete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }
  
  async find(item?: T): Promise<T[]> {
    return (await this._collection.find({}).toArray()) as unknown as T[];
  }
  
  findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  
  update(id: string, item: T): Promise<boolean> {
    return Promise.resolve(false);
  }
  
}
