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

app.get("/search/:size?/:page?", (request, response) => {
  let size = request.query.size
  let page = request.query.page

  if (!size){size = 1000}else{size = parseInt(size)}

  db.query({ }, size).then(res=>response.send(res));
  //db.findSortLimit({ "price": {$lt:price}},{"price":1},limit).then(res=>response.send(res));
  
});



app.get("/products/:id", (request, response) => {
  try {
  db.query({ "_id": (request.params.id) }).then(res=>response.send(res))
}
catch(error) {
  response.status(500).send(error);
}
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
