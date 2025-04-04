import { config } from "dotenv";
import connectDB from "../database/db.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

config();
const userIdToDelete = "67ef725783ac00b5cb65ef9a"; // Replace with the actual senderId or receiverId

const deleteMessages = async () => {
  try {
    await connectDB();

    const result = await Message.deleteMany({
      $or: [{ senderId: userIdToDelete }, { receiverId: userIdToDelete }],
    });

    console.log(`Deleted ${result.deletedCount} messages successfully`);
  } catch (error) {
    console.error("Error deleting messages:", error);
  }
};

// Call the function
// deleteMessages();
export default deleteMessages;