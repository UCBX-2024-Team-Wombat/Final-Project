const fs = require('fs');
const csv = require('csv-parser'); //csv convertor to JSON // $ npm install csv-parser
const mongoose = require('mongoose');
const Country = require('./models/Country'); 
// burda arraye tanimlamaya ihticac var mi ? sonuclari dondurmek icin ? const results = []  gibi. kaynakta oyle soylemis cunki ama ben object olarak tanimlamak istiyorum

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/OUR DATABASE', { // dont forget to write our database name here will we use mine or Jmails or directly cloud ? ideas /
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const importCSV = async () => {
  const countries = {};

  