const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const others = require('../controllers/others');
// const ctrlMain = require('../controllers/others');

/* GET home page. */

/* Location pages */
router.get('/', ctrlLocations.homelist);
router.get('/location', ctrlLocations.locationInfo);
router.get('/location/review/new', ctrlLocations.addReview);

/* Other pages */
router.get('/about', others.about);

module.exports = router;