/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const montlimartbrand = require('./sources/montlimartbrand');
const adresseparisbrand = require('./sources/adresseparisbrand');

const brands = {
  Dedicated: 'https://www.dedicatedbrand.com/en/men/all-men',
  Montlimart: 'https://adresse.paris/630-toute-la-collection',
  AdresseParis: 'https://www.montlimart.com/toute-la-collection.html'
}


async function sandbox(index) {
  try {
    console.log(`🕵️‍♀️  browsing ${brands[index]} source`);

    const products = await index == 0 ? dedicatedbrand.scrape(brands[index]) : index == 1 ? montlimartbrand.scrape(brands[index]) : adresseparisbrand.scrape(brands[index]);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function launchScrape(){
  brands.forEach((x, i) => await(sandbox(i)));
}

launchScrape(URLLIst);