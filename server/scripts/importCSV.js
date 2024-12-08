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
  const countries = {}; // i want to use object instead of array 

  fs.createReadStream('data.csv')
    .pipe(csv()) 
    .on('data', (row) => {
      const { CountryName, StateName, CityName, CountyName } = row;
      if (!countries[CountryName]) {
        countries[CountryName] = { name: CountryName, states: [] };
      }

      const country = countries[CountryName];
      let state = country.states.find((s) => s.name === StateName);

      if (!state) {
        state = { name: StateName, cities: [] };
        country.states.push(state);
      }

      let city = state.cities.find((c) => c.name === CityName);

      if (!city) {
        city = { name: CityName, counties: [] };
        state.cities.push(city);
      }
      if (!city.counties.some((county) => county.name === CountyName)) {
        city.counties.push({ name: CountyName });
      }
    })
    .on('end', async () => {
      try {
        for (const countryName in countries) {
          const country = new Country(countries[countryName]);
          await country.save();
        }
        console.log('CSV data imported successfully!');
        mongoose.connection.close();
      } catch (err) {
        console.error(err);
        mongoose.connection.close();
      }
    });
};

importCSV();


  