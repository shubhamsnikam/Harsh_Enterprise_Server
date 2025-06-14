const Visit = require('../models/Visit');

// Get all visits
exports.getAllVisits = async (req, res) => {
  try {
    const visits = await Visit.find().sort({ nextVisitDate: -1 });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits:', error.message);
    res.status(500).json({ message: 'Server error while fetching visits' });
  }
};

// Visits on a specific date
exports.getVisitsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    if (isNaN(date)) return res.status(400).json({ message: 'Invalid date format' });

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));
    const visits = await Visit.find({ nextVisitDate: { $gte: start, $lte: end } });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits by date:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Same as above, with alias name
exports.getVisitsForSpecificDay = exports.getVisitsByDate;

// Today’s visit count
exports.getTodayVisitCount = async (req, res) => {
  try {
    const now = new Date();
    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));
    const count = await Visit.countDocuments({ nextVisitDate: { $gte: start, $lte: end } });
    res.json({ count });
  } catch (error) {
    console.error('Error getting today visit count:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upcoming visits
exports.getUpcomingVisitCount = async (req, res) => {
  try {
    const today = new Date();
    const count = await Visit.countDocuments({ nextVisitDate: { $gt: today } });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching upcoming visit count:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Total revenue from Paid visits
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Visit.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, totalRevenue: { $sum: "$serviceCharges" } } }
    ]);
    res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error('Error fetching revenue:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create visit with 3-month auto scheduling
exports.createVisit = async (req, res) => {
  try {
    const {
      customerName,
      employeeName,
      employeeMobile,
      serviceDescription,
      serviceCharges,
      serviceAddress,
      visitDate,
      visitTime,
      paymentStatus = 'Pending',
      outStatus = 'In',
      outDate
    } = req.body;

    const parsedVisitDate = visitDate ? new Date(visitDate) : new Date();
    if (isNaN(parsedVisitDate)) return res.status(400).json({ message: 'Invalid visitDate' });

    const nextVisitDate = new Date(parsedVisitDate);
    nextVisitDate.setMonth(nextVisitDate.getMonth() + 3);

    const visit = new Visit({
      customerName,
      employeeName,
      employeeMobile,
      serviceDescription,
      serviceCharges: Number(serviceCharges),
      serviceAddress,
      visitDate: parsedVisitDate,
      nextVisitDate,
      visitTime,
      paymentStatus,
      outStatus,
      outDate
    });

    await visit.save();
    res.status(201).json(visit);
  } catch (error) {
    console.error('Error creating visit:', error.message);
    res.status(500).json({ message: 'Failed to create visit' });
  }
};

// Update visit
exports.updateVisit = async (req, res) => {
  try {
    const updated = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Visit not found' });
    res.json(updated);
  } catch (error) {
    console.error('Error updating visit:', error.message);
    res.status(500).json({ message: 'Failed to update visit' });
  }
};

// Optional: Delete visit
exports.deleteVisit = async (req, res) => {
  try {
    const deleted = await Visit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Visit not found' });
    res.json({ message: 'Visit deleted successfully' });
  } catch (error) {
    console.error('Error deleting visit:', error.message);
    res.status(500).json({ message: 'Failed to delete visit' });
  }
};
