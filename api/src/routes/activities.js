const { Router } = require('express');
const { Activity, Country } = require('../db');

const router = Router();


router.get('/', async (req, res) => {
    const allActivities = await Activity.findAll({include:Country})
    res.json(allActivities)
});


router.post('/', async (req, res) => {
    const {
        name,
        difficulty,
        duration,
        season,
        countries,
    } = req.body;

    try {
        const activity_ref = await Activity.findOne({where: { name: name }});

        if (activity_ref) {
        const finder = await Activity.findOne({where: { name: name }, include:Country})
        await countries.forEach((country) => 
        activity_ref.setCountries([...finder.Countries, country]))
        res.status(200).json({msg: `The activity ${name} already exist. We added it to ${countries}`})

        } else {
            

        let activity = await Activity.create({ name, difficulty, duration, season })
        await activity.setCountries(countries)
        res.status(200).json({msg: `Actividad ${activity.name} creada correctamente`})

//CIV, AGO, ASM, CHN
        }

    } catch (error) {
        res.status(400).json(error)
    }

});

module.exports = router;

// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes
// */