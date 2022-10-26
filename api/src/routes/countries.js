const { Router } = require('express');
const { Country, Activity } = require('../db');
const router = Router();
const axios = require('axios')

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
    console.log(id.slice(0,3))
    let country;

    try {

        country = await Country.findByPk(id.slice(0,3).toUpperCase(), { include: Activity })


        if (id.slice(0,3).toUpperCase() == country.id) {
            res.json(country)
        } else {
            res.json('Cant found an country with that ID')
        }


    } catch (error) {
        res.status(404).send("No country with that ID/Code")
    }
})

module.exports = router;