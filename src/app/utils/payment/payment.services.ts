/* eslint-disable @typescript-eslint/no-explicit-any */
// import verifyModel from "../../module/Verify/verify.model";
import { User } from "../../modules/User/user.model";
import { VerifyModel } from "../../modules/Verify/verify.model";
import { verifyPayment } from "./payment.utils";

const confirmationServices = async (payload: Record<string, string>) => {
  const verifyStatus = await verifyPayment(payload?.tranId);

  if (verifyStatus?.pay_status == "Successful") {
    const paymentInFo = {
      user: payload?.userId,
      totalPay: verifyStatus?.amount,
      paymentStatus: "Paid",
      transactionId: payload?.tranId,
      payment_processor: verifyStatus?.payment_processor,
      payment_type: verifyStatus?.payment_type,
      date: verifyStatus?.date,
    };

    const res: any = await VerifyModel.create(paymentInFo);

    if (res) {
      await User.findByIdAndUpdate(res?.user, { isVerify: true },{new:true});
    }
    return `<h1>payment success</h1>`;
  }
  return null
};

export const paymentServices = {
  confirmationServices,
};
