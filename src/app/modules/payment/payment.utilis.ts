/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../../config";
import axios from "axios";


export const initiatePayment = async (paymentData: any) => {
  // console.log('paymentdata', paymentData );
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_key,
    tran_id: paymentData.transactionId,
    success_url: "http://localhost:5000/api/payment/confirmation",
    // success_url: "https://travel-trove-server.vercel.app/api/payment/confirmation",
    fail_url: "http://www.merchantdomain.com/failedpage.html",
    cancel_url: "http://www.merchantdomain.com/cancellpage.html",
    amount: paymentData.totalPrice,
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

