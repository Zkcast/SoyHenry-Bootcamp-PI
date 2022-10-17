const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();

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

router.get('/:id', async (req, res) => {
    const { id } = req.params
    let country;

    try {

        country = await Country.findByPk(id.toUpperCase(), { include: Activity })

        // country = {
        //     id: country.id,
        //     name: country.name,
        //     image: country.image,
        //     continent: country.continent,
        //     capital: country.capital,
        //     subregion: country.subregion,
        //     area: country.area,
        //     population: country.population,
        //     maps: country.maps,
        //     activities: country.activities?.map((act) => {
        //         return {
        //             id: act.id,
        //             name: act.name,
        //             difficulty: act.difficulty,
        //             duration: act.duration,
        //             season: act.season
        //         }
        //     })
        // }

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
