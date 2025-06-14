const express = require('express');
const router = express.Router();
const visitController = require('../controllers/visitController');

// FIXED ROUTES FIRST
router.get('/today/count', visitController.getTodayVisitCount);
router.get('/upcoming/count', visitController.getUpcomingVisitCount);
router.get('/revenue/total', visitController.getTotalRevenue);

// PARAMETERIZED ROUTES AFTER
router.get('/date/:date', visitController.getVisitsByDate);
router.get('/today/:date', visitController.getVisitsForSpecificDay);

// CRUD
router.get('/', visitController.getAllVisits);
router.post('/', visitController.createVisit);
router.put('/:id', visitController.updateVisit);
router.delete('/:id', visitController.deleteVisit); // Optional



module.exports = router;
