import { Schema, model } from "mongoose";
import { IVerify } from "./verify.interface";

const verifySchema: Schema<IVerify> = new Schema<IVerify>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    totalPay: {
      type: Number,
      required: false, // Optional field
      default: 0, // You can set a default if desired
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'], // Enum for valid status values
      required: false, // Optional field
    },
    transactionId: { 
      type: String, 
      required: false, 
      unique: true, // Unique transaction IDs
    },
    paymentProcessor: { 
      type: String, 
      required: false 
    },
    paymentType: { 
      type: String, 
      required: false 
    },
    date: { 
      type: Date, 
      default: Date.now, // Defaults to the current date
      required: false 
    },
  },
  {
    timestamps: true,
  }
);

export const VerifyModel = model<IVerify>("Verify", verifySchema);
