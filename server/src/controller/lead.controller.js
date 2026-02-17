import Lead from "../model/Lead.js";

// Get all leads (Admin only)
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error("Get leads error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};

// Create a lead
export const createLead = async (req, res) => {
  try {
    const leadData = req.body;
    // If user is admin, they might be adding a manual lead
    const isAdmin = req.user && req.user.role === "admin";

    if (isAdmin && !leadData.source) {
      leadData.source = "Manual Entry";
    } else if (!leadData.source) {
      leadData.source = "Form Submission";
    }

    const lead = await Lead.create(leadData);
    res.status(201).json({
      success: true,
      data: lead,
      message: "Lead created successfully",
    });
  } catch (error) {
    console.error("Create lead error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
      error: error.message,
    });
  }
};

// Update a lead (Admin only)
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const lead = await Lead.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      data: lead,
      message: "Lead updated successfully",
    });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

// Delete a lead (Admin only)
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};
