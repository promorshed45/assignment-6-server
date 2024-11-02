/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { Payment } from "./verify.model";
import AppError from "../../errors/AppError";
import { initiatePayment } from "../payment/payment.utilis";
import { paymentSearchableFields } from "../User/user.constant";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { User } from "../User/user.model";


const createVerifyUser = async (userData: any) => {

  const user = await User.findById(userData.user);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (user.verified === true) {
    throw new AppError(httpStatus.NOT_FOUND, "User already verified");
  }

  const transactionId = `TXN-${Date.now()}`;

  const payload = {
    ...userData,
    transactionId
  }

  const result = await Payment.create(payload);
  console.log(result);

  // Prepare payment data
  const paymentData = {
    transactionId,
    amount: userData.amount,
    customerName: user.name,
    customerEmail: user.email,
    customerPhone: user.mobileNumber,
  };

  // console.log('paymentData', paymentData);
  // payement
  const paymentSession = await initiatePayment(paymentData);

  // console.log('paymentSession', paymentSession);

  return paymentSession;
}

const getAllPayemnt = async (query: Record<string, unknown>) => {
  const Payments = new QueryBuilder(Payment.find().populate("user"), query)
    .fields()
    .paginate()
    .sort()
    .filter()
    .search(paymentSearchableFields);

  const result = await Payments.modelQuery;
  return result;
};

export const VerifyService = {
  createVerifyUser,
  getAllPayemnt
};
