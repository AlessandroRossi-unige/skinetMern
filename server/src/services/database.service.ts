// External Dependencies
import * as mongoDB from "mongodb";


// Global Variables
export const collections: { todos?: mongoDB.Collection, products?: mongoDB.Collection } = {}

/*// Initialize Connection
export async function connectToDatabase () {
  dotenv.config();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
  
  await client.connect();
  
  const db: mongoDB.Db = client.db(process.env.DB_NAME);
  
  const todosCollection: mongoDB.Collection = db.collection(process.env.TODOS_COLLECTION_NAME as string);

  collections.products = db.collection("products");
  
  console.log(`Successfully connected to database: ${db.databaseName} and collection: ${todosCollection.collectionName}`);

  
}*/

