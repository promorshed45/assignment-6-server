/* eslint-disable @typescript-eslint/no-explicit-any */
import { initiatePayment } from "../../utils/payment/payment.utils";
import { User } from "../User/user.model";
import { VerifyModel } from "./verify.model";

const createVerify = async (payload: Record<string, any>, userId: string) => {
    try {
        // Ensure totalPay is present in the payload
       

        // Retrieve user information
        const userInfo = await User.findById(userId);
        console.log('userinfo', userInfo);
        if (!userInfo) {
            throw new Error("User not found.");
        }

        // Create a unique transaction ID
        const transactionId = `TXN-${userInfo._id}-${Date.now()}`;

        // Prepare payment data
        const paymentData = {
            transactionId,
            // totalAmount, // Convert to cents if needed
            userId,
            userName: userInfo.name,
            userEmail: userInfo.email,
            customerPhone: userInfo.mobileNumber,
            // customerAddress: userInfo.address // Uncomment if needed
        };

        // Initiate payment
        const paymentSession = await initiatePayment(paymentData);

        return paymentSession;
    } catch (error) {
        console.error('Error in createVerify:', (error as Error).message);
        throw error; // Re-throw the error for further handling
    }
};

const getAllVerifyfromDB=async()=>{
    const res=await VerifyModel.find().populate('user')
    return res
}


export const verifyService = {
    createVerify,
    getAllVerifyfromDB
}