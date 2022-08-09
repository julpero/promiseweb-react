import mongoose from "mongoose";
import { ConnectionOptions } from "tls";

const connectDB = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const connect = await mongoose.connect(process.env.MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectionOptions);
    console.log("Database is connected");
  } catch (error: unknown) {
    console.log(error);
  }
};

export default connectDB;
