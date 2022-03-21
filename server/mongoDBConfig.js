const {MongoClient} = require('mongodb');

async function main(){
    const MONGODB_URI = 'mongodb+srv://anfroiyan:temalakichta69@clearfashioncluster.vqzn2.mongodb.net/clearfashion?retryWrites=true&w=majority';
    const MONGODB_DB_NAME = 'clearfashion';

    console.log("connecting...")
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    console.log('connected');


    listDatabases(client)

    client.connect(err => {
      const collection = client.db(MONGODB_DB_NAME).collection('products');

  
      const products = [];
      const jsonData=require('./brands.json');
      console.log('TEST JSON');
      console.log(jsonData);
      console.log('END TEST');
      
      
      const result = collection.insertMany(products);
      console.log(result);
      
      



      client.close();
    });
    
}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases :");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


main().catch(console.error);