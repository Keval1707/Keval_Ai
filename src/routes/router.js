// routes.js
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const plantsData = require('../seed/plants.json');
const aboutUsData = require('../seed/locales/gu.json');

router.get('/', (req, res) => {
    res.render('pages/index', { plants: plantsData });
});

router.get('/about', (req, res) => {
    res.render('pages/about', { content: aboutUsData, plants: plantsData });
});


router.get('/nav', (req, res) => {
    res.render('pages/navbar');
});

router.get('/cart', (req, res) => {
    res.render('pages/cart', { plants: plantsData });
});


router.get('/addProduct', (req, res) => {
    res.render('pages/addProduct');
});

router.post('/addProduct', (req, res) => {
    const formData = req.body;
    const lastId = plantsData.length > 0 ? plantsData[plantsData.length - 1].id : 0;
    formData.id = lastId + 1;
    plantsData.push(formData);
    const filePath = path.join(__dirname, '../seed/plants.json');
    fs.writeFileSync(filePath, JSON.stringify(plantsData, null, 2));
    console.log('Updated plantsData:', plantsData);
    res.send({ valid: true, data: formData });
});
router.get('/buy', (req, res) => {
    const plantId = parseInt(req.query.id);
    const selectedPlant = plantsData.find(plant => plant.id === plantId);

    if (!selectedPlant) {
        res.status(404).render('pages/error', { error: 'Plant not found' });
        return;
    }

    res.render('pages/buy', { plant: selectedPlant, plants: plantsData });
});


module.exports = router;
