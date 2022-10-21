const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();
const axios = require('axios')

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios')
const { Country, Activity } = require('./src/db.js');
const { activitiesOfWorld, CountriesWhere } = require('./extra-db/activities')

// Para desarrollo >> 

router.get('/', async (req, res) => {

    const {name} = req.query

    try {
        const allCountries = await Country.findAll({include: Activity});
        if (name) {
         const match = await allCountries.filter(country => country.name.toLowerCase().startsWith(name.toLowerCase()))
         match.length ? res.json(match) : res.status(404).send({ 'Error': 'No country matched with that name' })
        } else {
        return res.status(200).send(allCountries)}

    } catch (error) {
        res.status(404).send(error);
    }
})

// Para produccion >> 

// router.get('/', async (req, res) => {

//     try {
//         const fetchCountries = await axios.get(`https://restcountries.com/v3.1/all`)
//         const allCountries = fetchCountries.data.map(country => {

//             const { name: { common }, translations: { spa }, flags: { svg }, maps, cca3, continents, capital, subregion, area, population } = country;
          
//             return {
//               name: common,
//               nameSpanish: spa.common ? spa.common : common,
//               flag: svg ? svg : "The server has not found a flag for this country",
//               id: cca3,
//               continent: continents[0],
//               capital: capital ? capital[0] : "Capital not found",
//               subregion: subregion ? subregion : "Subregion not found",
//               area: area ? area : 0,
//               population: parseInt(population),
//               maps: maps.googleMaps
//             }
//           })

//         return res.status(200).send(allCountries)
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })


router.get('/loaddb', async(req, res) => {

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

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    let country;

    try {

        country = await Country.findByPk(id.toUpperCase(), { include: Activity })

        if (id.toUpperCase() == country.id) {
            res.json(country)
        } else {
            res.json('Cant found an country with that ID')
        }


    } catch (error) {
        res.status(404).send("No country with that ID/Code")
    }
})

module.exports = router;







/*
[ ] GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises.
[ ] GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
[ ] GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado
*/
