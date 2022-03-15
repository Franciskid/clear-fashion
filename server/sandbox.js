/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('../server/sources/dedicatedbrand');
const montlimartbrand = require('../server/sources/montlimartbrand.js');
const adresseparisbrand = require('../server/sources/adresseparisbrand.js');

const fs = require('fs');
const { callbackify } = require('util');

const brands = {
  Dedicated: ['https://www.dedicatedbrand.com/en/men/all-men', dedicatedbrand],
  AdresseParis: ['https://adresse.paris/630-toute-la-collection', adresseparisbrand],
  Montlimart: ['https://www.montlimart.com/toute-la-collection.html', montlimartbrand]
}

let products = []

async function sandbox(index) {
    try
    {
      console.log(`🕵️‍♀️  browsing ${brands[index]} source, index :`, index);
  
      let _products = await brands[index][1].scrape(brands[index][0])
      
      console.log("Produits : ", _products);
      console.log('done');
      //products = products.concat(_products)
      console.log(_products);
      
      products = products.concat(_products);

      fs.writeFileSync("products.json", JSON.stringify(products), 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        
        console.log("The file was saved!");
        });

    }
    catch
    {
      console.error(e);
    }
  
}


Object.keys(brands)
.forEach(function(key) {
  sandbox(key);
})


  



