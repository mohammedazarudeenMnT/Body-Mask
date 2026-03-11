import Video from "../model/Video.js";

/**
 * Extract YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 */
const extractYouTubeId = (url) => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Get all videos (public: only Published, admin: all)
export const getVideos = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";
    const query = isAdmin ? {} : { status: "Published" };

    const videos = await Video.find(query).sort({ order: 1, createdAt: -1 });

    res.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error("Get videos error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch videos",
    });
  }
};

// Create a video (Admin only)
export const createVideo = async (req, res) => {
  try {
    const { title, description, youtubeUrl, status, order } = req.body;

    if (!title || !youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and YouTube URL are required",
      });
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL. Please provide a valid YouTube video URL.",
      });
    }

    const video = await Video.create({
      title,
      description: description || "",
      youtubeUrl,
      youtubeId,
      status: status || "Published",
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      data: video,
      message: "Video added successfully",
    });
  } catch (error) {
    console.error("Create video error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create video",
      error: error.message,
    });
  }
};

// Update a video (Admin only)
export const updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Re-extract YouTube ID if URL changed
    if (updateData.youtubeUrl) {
      const youtubeId = extractYouTubeId(updateData.youtubeUrl);
      if (!youtubeId) {
        return res.status(400).json({
          success: false,
          message: "Invalid YouTube URL",
        });
      }
      updateData.youtubeId = youtubeId;
    }

    const video = await Video.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      data: video,
      message: "Video updated successfully",
    });
  } catch (error) {
    console.error("Update video error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update video",
    });
  }
};

// Delete a video (Admin only)
export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({
      success: true,
      message: "Video deleted successfully",
    });
  } catch (error) {
    console.error("Delete video error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete video",
    });
  }
};
