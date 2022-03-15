const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');
/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);

  return $('.category-products .products-grid .item')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/[\s\t]/g, ' ');
        
      const price = parseInt(
        $(element)
           .find('.price')
          .text().trim().replace(/[\s\t€]/g, ' ').trim());
      
      const link = $(element).find('.product-name a').attr('href');

      console.log(`Montlimart Name : ${name}  Price : ${price}   Link : ${link}`)

      const photo = $(element).find('.product-image a img').attr('src');
      
      if (name && price && link)
      {
        const _id = uuidv5(link, uuidv5.URL);
        const brand = 'Montlimart'
        return {name, price,link,photo,_id,brand};
      }
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
