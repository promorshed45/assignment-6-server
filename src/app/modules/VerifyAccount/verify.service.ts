/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { Verify } from "./verify.model";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { initiatePayment } from "../payment/payment.utilis";


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

  const result = await Verify.create(payload);
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



export const VerifyService = {
  createVerifyUser
};
