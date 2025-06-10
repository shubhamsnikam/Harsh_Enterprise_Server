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
    // email: String, // Removed - You can comment out or delete this line
    address: {
        type: String
    },
    city: { // Added city field
        type: String
    },
    billNumber: { // Added billNumber field
        type: String
    },
    warrantyDateFrom: { // Added warrantyDateFrom field
        type: Date
    },
    warrantyDateTo: { // Added warrantyDateTo field
        type: Date
    },
    modelName: { // Added modelName field
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Customer', customerSchema);
