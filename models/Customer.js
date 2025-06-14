const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    // email: String, // Removed
    address: {
        type: String
    },
    city: {
        type: String
    },
    billNumber: {
        type: String
    },
    warrantyDateFrom: {
        type: Date
    },
    warrantyDateTo: {
        type: Date
    },
    modelName: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    invoiceDate: {
        type: Date
    },
    installationDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', customerSchema);
