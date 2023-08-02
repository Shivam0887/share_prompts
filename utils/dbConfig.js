import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    mongoose.connection.on("open", () => {
      console.log("Mongodb connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
