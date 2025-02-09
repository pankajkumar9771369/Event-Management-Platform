const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      creator: req.user._id
    });
    await event.save();
    
    // Emit socket event for real-time updates
    req.app.get('io').emit('newEvent', event);
    
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const events = await Event.find(query)
      .populate('creator', 'username')
      .populate('attendees', 'username')
      .sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('creator', 'username')
      .populate('attendees', 'username');
      
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }
// Update only allowed fields
const allowedUpdates = [
    'title',
    'description',
    'date',
    'location',
    'category',
    'maxAttendees'
  ];

  const updates = {};
  Object.keys(req.body).forEach(key => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  // Validate maxAttendees
  if (updates.maxAttendees && updates.maxAttendees < event.attendees.length) {
    return res.status(400).json({ 
      error: 'Maximum attendees cannot be less than current attendees count' 
    });
  }
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    ).populate('creator', 'username')
     .populate('attendees', 'username');
     if (!updatedEvent) {
        return res.status(404).json({ error: 'Event not found' });
      }
    req.app.get('io').emit('updateEvent', updatedEvent);
    
    res.json(updatedEvent);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Use findByIdAndDelete instead of remove()
    await Event.findByIdAndDelete(req.params.id);
    req.app.get('io').emit('deleteEvent', req.params.id);
    
    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    if (event.attendees.includes(req.user._id)) {
      return res.status(400).json({ error: 'Already joined' });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ error: 'Event is full' });
    }

    event.attendees.push(req.user._id);
    await event.save();

    const updatedEvent = await Event.findById(req.params.id)
      .populate('creator', 'username')
      .populate('attendees', 'username');

    req.app.get('io').emit('updateEvent', updatedEvent);
    
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};