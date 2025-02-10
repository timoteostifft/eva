import mongoose from "mongoose";

export const mongo = new mongoose.Mongoose();

mongo.connect(`mongodb://root:root@localhost:27017`);
