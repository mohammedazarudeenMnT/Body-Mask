import EventType from "../model/EventType.js";

// Get all event types
export const getEventTypes = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const query = isAdmin ? {} : { isActive: true };

    const eventTypes = await EventType.find(query).sort({ order: 1, name: 1 });

    res.json({
      success: true,
      data: eventTypes,
    });
  } catch (error) {
    console.error("Get event types error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event types",
    });
  }
};

// Get single event type by ID
export const getEventTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await EventType.findById(id);

    if (!eventType) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    res.json({
      success: true,
      data: eventType,
    });
  } catch (error) {
    console.error("Get event type by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch event type",
    });
  }
};

// Create event type
export const createEventType = async (req, res) => {
  try {
    const { name, isActive, order } = req.body;

    // Check if event type with same name exists
    const existing = await EventType.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Event type with this name already exists",
      });
    }

    const eventType = await EventType.create({ name, isActive, order });

    res.status(201).json({
      success: true,
      message: "Event type created successfully",
      data: eventType,
    });
  } catch (error) {
    console.error("Create event type error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create event type",
      error: error.message,
    });
  }
};

// Update event type
export const updateEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive, order } = req.body;

    const existing = await EventType.findById(id);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    // Check if another event type with same name exists
    if (name && name !== existing.name) {
      const duplicate = await EventType.findOne({ 
        name: { $regex: new RegExp(`^${name}$`, 'i') },
        _id: { $ne: id }
      });
      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: "Event type with this name already exists",
        });
      }
    }

    const eventType = await EventType.findByIdAndUpdate(
      id,
      { name, isActive, order },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Event type updated successfully",
      data: eventType,
    });
  } catch (error) {
    console.error("Update event type error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update event type",
    });
  }
};

// Delete event type
export const deleteEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const eventType = await EventType.findByIdAndDelete(id);

    if (!eventType) {
      return res.status(404).json({
        success: false,
        message: "Event type not found",
      });
    }

    res.json({
      success: true,
      message: "Event type deleted successfully",
    });
  } catch (error) {
    console.error("Delete event type error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete event type",
    });
  }
};
