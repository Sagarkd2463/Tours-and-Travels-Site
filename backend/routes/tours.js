const express = require('express');
const { createTour, getSingleTour, getAllTour, deleteTour, updateTour } = require('./../controllers/tourController');

const router = express.Router();

router.post('/', createTour);

router.get('/:id', getSingleTour);

router.get('/', getAllTour);

router.put('/:id', updateTour);

router.delete('/:id', deleteTour);

module.exports = router;