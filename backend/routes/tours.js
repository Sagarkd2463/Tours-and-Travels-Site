const express = require('express');
const
    {
        createTour,
        getSingleTour,
        getAllTour,
        deleteTour,
        updateTour,
        getTourBySearch,
        getFeaturedTour,
        getTourCount
    } = require('./../controllers/tourController');
const { verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

router.post('/', verifyAdmin, createTour);

router.put('/:id', verifyAdmin, updateTour);

router.delete('/:id', verifyAdmin, deleteTour);

router.get('/:id', getSingleTour);

router.get('/', getAllTour);

router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getTourByFeatured', getFeaturedTour);

router.get('/search/getTourCount', getTourCount);


module.exports = router;