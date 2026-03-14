import mongoose from "mongoose";
import dotenv from "dotenv";
import Gallery from "../src/model/Gallery.js";
import EventType from "../src/model/EventType.js";

dotenv.config();

async function fixGalleryEventTypes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Get all gallery items
    const galleryItems = await Gallery.find({});
    console.log(`Found ${galleryItems.length} gallery items`);

    // Get all valid event type IDs
    const validEventTypes = await EventType.find({});
    const validEventTypeIds = validEventTypes.map(et => et._id.toString());
    console.log(`Found ${validEventTypes.length} valid event types`);

    let fixedCount = 0;
    for (const item of galleryItems) {
      let needsUpdate = false;
      const updates = {};

      // Check if eventType is set and valid
      if (item.eventType) {
        const eventTypeId = item.eventType.toString();
        
        // If eventType is not a valid ObjectId or doesn't exist in EventType collection
        if (!mongoose.Types.ObjectId.isValid(eventTypeId) || !validEventTypeIds.includes(eventTypeId)) {
          console.log(`Fixing invalid eventType for gallery item: ${item.title} (${item._id})`);
          updates.eventType = null;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await Gallery.findByIdAndUpdate(item._id, updates);
        fixedCount++;
      }
    }

    console.log(`\nFixed ${fixedCount} gallery items with invalid event types`);
    console.log("Database cleanup complete!");

  } catch (error) {
    console.error("Error fixing gallery event types:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

fixGalleryEventTypes();
