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
        .find('.product-name-container.versionmob')
        .text()
        .trim()
        .replace(/[\s\t]/g, ' ');
      const price = parseInt(
        $(element)
           .find('.price.product-price')
          .text().trim().replace(/[\s\t€]/g, ' ').trim());
      
      const link = 
      $(element).find('.product_img_link').attr('href');

      let photo = []
      photo.push($(element).find('.img_0').attr('data-original'));
      photo.push($(element).find('.img_1').attr('data-rollover'));
      let _id = uuidv5(link, uuidv5.URL);
      let brand = 'Montlimart'
      return {name, price,link,photo,_id,brand};

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
