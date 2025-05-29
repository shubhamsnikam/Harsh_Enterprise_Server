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

// Get visits for a specific date (via /date/:date)
exports.getVisitsByDate = async (req, res) => {
  try {
    const dateParam = req.params.date;
    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const visits = await Visit.find({ nextVisitDate: { $gte: start, $lte: end } });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits by date:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get visits for a specific day (via /today/:date)
exports.getVisitsForSpecificDay = async (req, res) => {
  try {
    const dateParam = req.params.date;
    const date = new Date(dateParam);

    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const visits = await Visit.find({ nextVisitDate: { $gte: start, $lte: end } });
    res.json(visits);
  } catch (error) {
    console.error('Error fetching visits for specific day:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get today's visit count
exports.getTodayVisitCount = async (req, res) => {
  try {
    const now = new Date();

    const start = new Date(now);
    start.setHours(0, 0, 0, 0);

    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    const count = await Visit.countDocuments({
      nextVisitDate: { $gte: start, $lte: end }
    });

    res.json({ count });
  } catch (error) {
    console.error('❌ Error fetching today visit count:', error.message);
    res.status(500).json({ message: 'Server error while fetching today visit count' });
  }
};



// Get upcoming visit count
exports.getUpcomingVisitCount = async (req, res) => {
  try {
    const today = new Date();
    const count = await Visit.countDocuments({ nextVisitDate: { $gt: today } });
    res.json({ count });
  } catch (error) {
    console.error('Error fetching upcoming visit count:', error.message);
    res.status(500).json({ message: 'Server error while counting upcoming visits' });
  }
};

// Get total revenue from paid visits
exports.getTotalRevenue = async (req, res) => {
  try {
    const result = await Visit.aggregate([
      { $match: { paymentStatus: 'Paid' } },
      { $group: { _id: null, totalRevenue: { $sum: "$serviceCharges" } } }
    ]);
    res.json({ totalRevenue: result[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error('Error fetching total revenue:', error.message);
    res.status(500).json({ message: 'Server error while fetching revenue' });
  }
};

// Create new visit
exports.createVisit = async (req, res) => {
  try {
    if (!req.body.nextVisitDate) {
      return res.status(400).json({ message: 'nextVisitDate is required' });
    }

    // You no longer need to pass visitDate; schema will default it
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json(visit);
  } catch (error) {
    console.error('Error creating visit:', error.message);
    res.status(500).json({ message: 'Failed to create visit' });
  }
};


// Update visit by ID
exports.updateVisit = async (req, res) => {
  try {
    const updated = await Visit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Visit not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating visit:', error.message);
    res.status(500).json({ message: 'Failed to update visit' });
  }
};
