const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./mongodb.js');
const PORT = 8092;
const MONGO_COLLECTION = 'products';

const app = express();




module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get("/search/:limit?/:brand?/:price?", (request, response) => {
  let limit = request.query.limit
  let brand = request.query.brand
  console.log("brand", brand);
  let price = request.query.price
  if (!limit){limit = 12}else{limit = parseInt(limit)}
  if (!brand){brand = "all"}
  if (!price){price = 99999999}else{price = parseInt(price)}
  if(brand !=="all"){
    db.findSortLimit({ "price": {$lt:price}, "brand":brand},{"price":1},limit).then(res=>response.send(res));
  }else{
    db.findSortLimit({ "price": {$lt:price}},{"price":1},limit).then(res=>response.send(res));
  }
  
});

  


app.get("/products/:id", (request, response) => {
  db.query({ "_id": (request.params.id) }).then(res=>response.send(res))
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
