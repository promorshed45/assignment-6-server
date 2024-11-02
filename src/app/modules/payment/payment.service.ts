/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { verifyPayment } from "./payment.utilis";

import { User } from '../User/user.model';
import { Verify } from '../VerifyAccount/verify.model';
import { verifyPayment } from './payment.utilis';

// eslint-disable-next-line no-unused-vars
const confirmationService = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
//   console.log(verifyResponse);

  let result;
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await Verify.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: 'Paid',
      },
      { new: true },
    );

     // Update user's verified status
     const userUpdate = await User.findOneAndUpdate(
        { email: verifyResponse.cus_email },
        { verified: true },
        { new: true }
      );
  
      console.log(result);
      console.log('userUpdate', userUpdate);
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Confirmation</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-color: #FEFCE8;
                    }
                    .card {
                        background-color: white;
                        padding: 32px;
                        border-radius: 16px;
                        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                    }
                    .icon {
                        width: 64px;
                        height: 64px;
                        border: 4px solid #38a169;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: transform 0.5s;
                    }
                    .icon svg {
                        width: 32px;
                        height: 32px;
                        color: #38a169;
                    }
                    h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #2d3748;
                        transition: opacity 0.7s ease-in-out;
                    }
                    p {
                        color: #718096;
                        text-align: center;
                    }
                    a {
                        padding: 8px 24px;
                        background-color: #38a169;
                        color: white;
                        border-radius: 8px;
                        text-decoration: none;
                        transition: background-color 0.3s;
                    }
                    a:hover {
                        background-color: #2f855a;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="card">
                        <div class="icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2>Payment Successful!</h2>
                        <p>Thank you for your payment. <br> Your transaction was completed successfully.</p>
                        <a href="http://localhost:3000/">Go to Home</a>
                    </div>
                </div>
            </body>
            </html>
        `;
  } else {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Failed</title>
                <style>
                    body {
                        font-family: 'Poppins', sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        background-color: #FEFCE8;
                    }
                    .card {
                        background-color: white;
                        padding: 32px;
                        border-radius: 16px;
                        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 16px;
                    }
                    .icon {
                        width: 64px;
                        height: 64px;
                        border: 4px solid #ff334c;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: transform 0.5s;
                    }
                    .icon svg {
                        width: 32px;
                        height: 32px;
                        color: #ff334c;
                    }
                    h2 {
                        font-size: 1.5rem;
                        font-weight: 600;
                        color: #2d3748;
                        transition: opacity 0.7s ease-in-out;
                    }
                    p {
                        color: #718096;
                        text-align: center;
                    }
                    a {
                        padding: 8px 24px;
                        background-color: #38a169;
                        color: white;
                        border-radius: 8px;
                        text-decoration: none;
                        transition: background-color 0.3s;
                    }
                    a:hover {
                        background-color: #2f855a;
                    }
                </style>
            </head>
            
            <body>
               <div class="container">
                    <div class="card">
                        <div class="icon">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
</svg>

                        </div>
                        <h2>Payment Failed!</h2>
                        <p>Your transaction could not be completed. Please try again later.</p>
                        <a href="http://localhost:3000/">Go to Home</a>
                    </div>
                </div>
                
            </body>
            </html>
        `;
  }
};

export const paymentServices = {
  confirmationService,
};
