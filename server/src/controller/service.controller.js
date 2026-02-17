import Service from "../model/Service.js";

// Get all services
export const getServices = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const { category } = req.query;

    let query = isAdmin ? {} : { isActive: true };

    if (category && category !== "All") {
      query = { ...query, title: category };
    }

    const services = await Service.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
};

// Get single service by slug
export const getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const isAdmin = req.user && req.user.role === "admin";
    const query = isAdmin ? { slug } : { slug, isActive: true };

    const service = await Service.findOne(query);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service by slug error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service detail",
    });
  }
};

// Get single service by ID (Internal/Admin)
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Get service by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service detail",
    });
  }
};

// Create service
export const createService = async (req, res) => {
  try {
    const serviceData = req.body;

    // Check if slug exists
    if (serviceData.slug) {
      const existing = await Service.findOne({ slug: serviceData.slug });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: "A service with this slug already exists",
        });
      }
    }

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      message: "Service created successfully",
      data: service,
    });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await Service.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service",
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
    });
  }
};
