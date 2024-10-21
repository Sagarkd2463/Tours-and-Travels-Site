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

const router = express.Router();

router.post('/', createTour);

router.get('/:id', getSingleTour);

router.get('/', getAllTour);

router.get('/search/getTourBySearch', getTourBySearch);

router.get('/search/getTourByFeatured', getFeaturedTour);

router.get('/search/getTourCount', getTourCount);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

module.exports = router;