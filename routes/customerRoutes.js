const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Routes
router.get('/', customerController.getAllCustomers);
router.get('/count', customerController.getCustomerCount);
router.post('/', customerController.createCustomer);
router.get('/:id', customerController.getCustomerById);      
router.put('/:id', customerController.updateCustomer);       
router.delete('/:id', customerController.deleteCustomer);    

module.exports = router;
