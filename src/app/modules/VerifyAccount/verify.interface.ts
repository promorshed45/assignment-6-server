import { Types } from "mongoose";

export type TPayment = {
  user: Types.ObjectId;
  status: string;
  paymentStatus: string;
  amount: number;
  transactionId: string;
}
