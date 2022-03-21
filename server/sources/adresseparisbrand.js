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

  return $('.product-container')
    .map((i, element) => {
      const name = $(element)
        .find('.product-name')
        .text()
        .trim()
        .replace(/[\s\t]/g, ' ');

      const price = parseInt(
        $(element)
           .find('.prixright')
          .text().trim().replace(/[\s\t€]/g, ' ').trim());
      
      const link = $(element).find('.product_img_link').attr('href');

      const photo = $(element).find('.img_0').attr('src');
      
      if (link)
      {
        let _id = uuidv5(link, uuidv5.URL);
        let brand = 'AdresseParis'
        return {name, price,link,photo,_id,brand};
      }
      else
      {
        let _id = uuidv5(name, uuidv5.URL);
        let brand = 'AdresseParis'
        return {name, price, link, photo, _id, brand}
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
