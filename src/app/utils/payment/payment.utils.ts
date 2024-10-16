/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData:any) => {
  console.log('paymentData0', paymentData);
  const response = await axios.post(config.payment_url!, {
    store_id:config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?userId=${paymentData?.userId}&&tranId=${paymentData?.transactionId}`,
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    amount: paymentData.totalAmount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData?.userName,
    cus_email: paymentData?.userEmail,
    // cus_add1: paymentData?.mobileNumber,
    cus_country: "Bangladesh",
    cus_phone: paymentData?.customerPhone,
    user_id:paymentData?.userId,
    type: "json",
  });
// console.log(response);
  return response.data
};

export const verifyPayment = async (tnxId: string) => {
    try {
        const response = await axios.get(config.verify_payment_url!, {
            params: {
                store_id: config.store_id,
                signature_key: config.signature_key,
                type: "json",
                request_id: tnxId
            }
        });

        return response.data;
    }
    catch (err) {
        throw new Error("Payment validation failed!")
    }
}