const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  customerName:    { type: String, required: true },
  employeeName:    { type: String, required: true },
  employeeMobile:  { type: String, required: true },
  serviceDescription: { type: String, required: true },
  serviceCharges:  { type: Number, required: true },
  serviceAddress:  { type: String, required: true },
  visitDate:       { type: Date },   
  nextVisitDate:   { type: Date, required: true },
  visitTime:       { type: String },
  paymentStatus:   { type: String, default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
