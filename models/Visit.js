const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  customerName:    { type: String, required: true, trim: true },
  employeeName:    { type: String, required: true, trim: true },
  employeeMobile:  { type: String, required: true, trim: true },
  serviceDescription: { type: String, required: true },
  serviceCharges:  { type: Number, required: true, min: 0 },
  serviceAddress:  { type: String, required: true },
  visitDate:       { type: Date, default: Date.now },
  nextVisitDate:   { type: Date, required: true },
  visitTime:       { type: String },
  paymentStatus:   { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  outStatus:       { type: String, enum: ['In', 'Out'], default: 'In' },
  outDate:         { type: Date },
  installationDate: {type: Date},

}, { timestamps: true });

module.exports = mongoose.model('Visit', visitSchema);
