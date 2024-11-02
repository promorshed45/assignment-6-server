import { Schema, model } from 'mongoose';
import { TPayment } from './verify.interface';


const PaymentSchema = new Schema<TPayment>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  amount: {
    type: Number,
    // required: true
  },
  transactionId: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
})


// Define and export the Verify model
export const Payment = model<TPayment>('Payment', PaymentSchema);

