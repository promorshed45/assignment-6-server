import { Document, Types } from 'mongoose';

export interface IVerify extends Document {
  user: Types.ObjectId;          
  totalPay?: number;
  paymentStatus?: 'pending' | 'success' | 'failed';
  transactionId?: string;        
  paymentProcessor?: string;      
  paymentType?: string;
  date?: Date;
 }
