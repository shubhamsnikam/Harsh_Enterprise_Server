const Customer = require('../models/Customer');

// Get all customers
exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get total customer count
exports.getCustomerCount = async (req, res) => {
    try {
        const count = await Customer.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Error counting customers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new customer
exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(400).json({ message: 'Invalid data', error: error.message }); // Include error message for debugging
    }
};

// Get single customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update customer
exports.updateCustomer = async (req, res) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // Ensure validations are run on update
        });
        if (!updatedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(updatedCustomer);
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(400).json({ message: 'Invalid data', error: error.message }); // Include error message
    }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer deleted' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
