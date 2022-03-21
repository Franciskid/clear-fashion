/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../server/sources/dedicatedbrand');
const montlimartbrand = require('../server/sources/montlimartbrand.js');
const adresseparisbrand = require('../server/sources/adresseparisbrand.js');
const loombrand = require('../server/sources/loom.js');

const fs = require('fs');

const brands = {
  Dedicated: ['https://www.dedicatedbrand.com/en/men/all-men', dedicatedbrand],
  AdresseParis: ['https://adresse.paris/630-toute-la-collection', adresseparisbrand],
  Loom: ['https://www.loom.fr/collections/vestiaire-homme', loombrand],
  Montlimart: ['https://www.montlimart.com/toute-la-collection.html', montlimartbrand]
}

let products = []

async function sandbox(index) {
    try
    {
      console.log(`🕵️‍♀️  browsing ${brands[index]} source, index :`, index);
  
      let _products = await brands[index][1].scrape(brands[index][0])
      
      console.log(`Just read ${_products.length} products for ${index}`);

      return _products;


    }
    catch
    {
      console.error(e);

      return [];
    }
}


async function launchScrape(){

   products = products.concat(await sandbox("Dedicated"));
   products = products.concat(await sandbox("Loom"));
   products = products.concat(await sandbox("Montlimart"));
   products = products.concat(await sandbox("AdresseParis"));

   console.log("Products so far : ", products.length)
   fs.writeFileSync("products.json", JSON.stringify(products), 'utf8', function (err) {
     if (err) {
         return console.log(err);
     }
     
     console.log("The file was saved!");
     });
}

launchScrape();
