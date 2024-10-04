// import { verifyPayment } from "./payment.utilis";

import { User } from "../User/user.model";

const confirmationService = async (transactionId: string) => {
    // const verifyResponse = await verifyPayment(transactionId);
    // console.log(verifyResponse);

  const result = await User.findOneAndUpdate(
    { transactionId },
    {
      verified: "true",
    },
    { new: true }
  );

  return result;
};

export const paymentServices = {
  confirmationService,
};
