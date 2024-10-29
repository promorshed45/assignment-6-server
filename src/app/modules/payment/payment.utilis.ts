/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  // console.log('paymentdata', paymentData );
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    amount: paymentData.amount,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: paymentData.customerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_phone: paymentData.customerPhone,
    type: "json",
  });
  // console.log(response);
  return response.data;
};

export const verifyPayment = async (tnxId: string, cus_email: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: "json",
        request_id: tnxId,
        cus_email
      },
    });

    return response.data;
  } catch (err) {
    console.log(err)
    throw new Error("Payment validation failed!");
  }
};
