/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { Verify } from "./verify.model";
import AppError from "../../errors/AppError";
import { User } from "../User/user.model";
import { initiatePayment } from "../payment/payment.utilis";



// const createVerifyUser = async (userData: any) => {
//   try {
//     // Validate the user exists
//     // const user = await User.findById(userData.user);
//     // if (!user) {
//     //   throw new AppError(httpStatus.NOT_FOUND, "User not found");
//     // }

//     // // Check if the user is already verified
//     // if (user.verified) {
//     //   throw new AppError(httpStatus.BAD_REQUEST, "User is already verified");
//     // }

//     // Generate transaction ID
//     const transactionId = `TXN-${Date.now()}`;

//     // Prepare payload
//     const payload = {
//       ...userData,
//       transactionId,
//     };

//     // Create the verify entry
//     const verifyUserEntry = await Verify.create(payload);
//     console.log('verifyUserEntry', verifyUserEntry);

//     // Prepare payment data
//     const paymentData = {
//       transactionId,
//       amount: userData.amount,
//       customerName: userData.user.name,
//       customerEmail: userData.user.email,
//       customerPhone: userData.user.mobileNumber,
//     };


//     // Initiate payment
//     const paymentSession = await initiatePayment(paymentData);

//     // Update user status to verified
//     // userData.user.verified = true;
//     // await userData.user.save();

//     // Populate user information
//     const populatedVerify = await verifyUserEntry.populate("user");

//     console.log('populatedVerify', populatedVerify);

//     return { populatedVerify, paymentSession };
    
//   } catch (error) {
//     console.error('Error in createVerifyUser:', error);
//     throw error;
//   }
// };


const createVerifyUser = async (userData: any) => {

  const user = await User.findById(userData.user);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

  // Check if the user is already verified
    if (user.verified) {
      throw new AppError(httpStatus.BAD_REQUEST, "User is already verified");
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
  // createVerify,
  createVerifyUser
};
