import { Types } from "mongoose";

export type TVerify = {
  user: Types.ObjectId;
  status: string;
  paymentStatus: string;
  amount: number;
  transactionId: string;
}
