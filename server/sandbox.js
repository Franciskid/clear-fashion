/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../server/sources/dedicatedbrand');
const montlimartbrand = require('../server/sources/montlimartbrand.js');
const adresseparisbrand = require('../server/sources/adresseparisbrand.js');

const fs = require('fs');

const brands = {
  Dedicated: ['https://www.dedicatedbrand.com/en/men/all-men', dedicatedbrand],
  Montlimart: ['https://adresse.paris/630-toute-la-collection', montlimartbrand],
  AdresseParis: ['https://www.montlimart.com/toute-la-collection.html', montlimartbrand]
}

async function sandbox(index) {
  try
  {
    console.log(`🕵️‍♀️  browsing ${brands[index]} source, index :`, index);

    let products = await brands[index][1].scrape(brands[index][0])
    
    console.log("Produits : ", products);
    console.log('done');

    fs.writeFileSync("products.json", JSON.stringify(products), 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
  
      console.log("The file was saved!");
  }); 

    process.exit(0);
  }
  catch
  {
    console.error(e);
    process.exit(1);
  }
}

async function launchScrape(){
  Object.keys(brands).forEach(async function(key) {
    console.log(key);
    await sandbox(key);
  });
}

launchScrape();
