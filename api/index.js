const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const { Country, Activity } = require('./src/db.js');
const { activitiesOfWorld, CountriesWhere } = require('./extra-db/activities')

const newDB = async () => {
  const fetchCountries = await axios.get(`https://restcountries.com/v3.1/all`)
  const allCountries = fetchCountries.data.map(country => {

    const { name: { common }, translations: { spa }, flags: { svg }, maps, cca3, continents, capital, subregion, area, population } = country;

    return {
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
  })

        allCountries.forEach(async (country) => {
          try {
            await Country.findOrCreate({
              where: country
            })
          } catch (error) {
            console.log(error)
          }
        })

        // try {
        // await Country.bulkCreate(allCountries)}
        // catch(error) {
        //   console.log(error)
        // }

        activitiesOfWorld.forEach(async (act) => {
          try {

            await Activity.findOrCreate({
              where: act
            })  
            try {
              const finder = await Activity.findOne({ where: { name: act.name } })
              await finder.setCountries(CountriesWhere(act.name))
            } catch (error) {
              console.log(error)
            }

          } catch (error) {
            console.log(error)
          }
        })


// Country.bulkCreate(allCountries)

};

// const newActivities = async () => {
//   for (let act of activitiesOfWorld) {
//     await Activity.findOrCreate({
//       where: act,
//     });

//     const finder = await Activity.findOne({ where: { name: act.name } })
//     await finder.setCountries(CountriesWhere(act.name))
//   }
// }

newDB()

conn.sync({ alter: true, force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});