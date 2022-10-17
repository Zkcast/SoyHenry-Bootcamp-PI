const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const { Country, Activity } = require('./src/db.js');
const {activitiesOfWorld} = require('./extra-db/activities')
const {CountriesWhereSurf,
  CountriesWhereRaffting,
  CountriesWhereSkydiving,
  CountriesWhereSki,
  CountriesWhereSkate 
} = require('./extra-db/activities')



const newDB = async () => {

  // await axios.get(`https://restcountries.com/v3.1/all`)
  //   .then(resultado => {
  //       resultado.data.forEach( country => {

  //       const { name: { common }, translations: {spa}, flags: {svg}, maps, cca3, continents, capital, subregion, area, population} = country;
                
  //       let countryActual = {
  //         name: common,
  //         nameSpanish: spa.common ? spa.common : common,
  //         flag: svg ? svg : "The server has not found a flag for this country",
  //         id: cca3,
  //         continent: continents[0],
  //         capital: capital ? capital[0] : "Capital not found",
  //         subregion: subregion ? subregion : "Subregion not found",
  //         area: area ? area : 0,
  //         population: parseInt(population),
  //         maps: maps.googleMaps
  //       }
  //       Country.findOrCreate({where: countryActual})

  //     }
  //   )
  // });

  await axios.get(`https://restcountries.com/v3.1/all`)
  
  .then(resultado => {
      resultado.data.forEach( country => {

      const { name: { common }, translations: {spa}, flags: {svg}, maps, cca3, continents, capital, subregion, area, population} = country;
              
      let countryActual = {
        name: common,
        nameSpanish: spa.common ? spa.common : common,
        flag: svg ? svg : "The server has not found a flag for this country",
        id: cca3,
        continent: continents[0],
        capital: capital ? capital[0] : "Capital not found",
        subregion: subregion ? subregion : "Subregion not found",
        area: area ? area : 0,
        population: parseInt(population),
        maps: maps.googleMaps
      }

      const finder = Activity.findOne({where: {name: countryActual.name}})
      if (!finder.length < 1) { 
      Country.findOrCreate({where: countryActual})}

    }
  )
});


    (async () => {
      
      for (let act of activitiesOfWorld) {

        let {name, difficulty, duration, season} = act 

        const result = await Activity.findOrCreate({
          where: {
            name: name, 
            difficulty: difficulty, 
            duration: duration, 
            season: season,
             },
        });
        
        const finder = await Activity.findOne({where: {name: name}})

        name === 'Surf' && await finder.setCountries(CountriesWhereSurf)
        name === 'Raffting' && await finder.setCountries(CountriesWhereRaffting)
        name === 'Skydiving' && await finder.setCountries(CountriesWhereSkydiving)
        name === 'Ski' && await finder.setCountries(CountriesWhereSki)
        name === 'Skate' && await finder.setCountries(CountriesWhereSkate)

      }
      })()

};

newDB()

conn.sync({force: false }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});