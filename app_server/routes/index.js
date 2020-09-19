const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const others = require('../controllers/others');
// const ctrlMain = require('../controllers/others');

/* GET home page. */

/* Location pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', others.about);

module.exports = router;