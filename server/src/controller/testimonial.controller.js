import Testimonial from "../model/Testimonial.js";

// Get all testimonials
export const getTestimonials = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    // Public only sees approved ones, admin sees all
    const query = isAdmin ? {} : { status: "Approved" };

    const testimonials = await Testimonial.find(query)
      .populate("service", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    console.error("Get testimonials error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch testimonials",
    });
  }
};

// Create a testimonial
export const createTestimonial = async (req, res) => {
  try {
    const testimonialData = req.body;
    const isAdmin = req.user && req.user.role === "admin";

    if (isAdmin) {
      testimonialData.source = "Manual Entry";
      // Admin can set status directly, but default is Pending if not specified
      if (!testimonialData.status) testimonialData.status = "Approved";
    } else {
      testimonialData.source = "User Submitted";
      testimonialData.status = "Pending";
    }

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json({
      success: true,
      data: testimonial,
      message:
        "Testimonial created successfully" +
        (isAdmin ? "" : ". It will be visible after approval."),
    });
  } catch (error) {
    console.error("Create testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create testimonial",
      error: error.message,
    });
  }
};

// Update a testimonial (Admin only)
export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Handle empty service string - convert to null or undefined to avoid CastError
    if (updateData.service === "") {
      updateData.service = null;
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      data: testimonial,
      message: "Testimonial updated successfully",
    });
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update testimonial",
    });
  }
};

// Delete a testimonial (Admin only)
export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete testimonial",
    });
  }
};
