import { Request, Response } from 'express';
import { verifyService } from './verify.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
// import { orderService } from './order.service';

const createVerifyController = async (req: Request, res: Response) => {
    try {
        // Destructure userId from the request body
        const { userId } = req.body;

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required."
            });
        }

        // Call the service to create the verification
        const result = await verifyService.createVerify(req.body, userId);
        console.log('Verification result:', result);

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Successfully applied for account verification.",
            data: result
        });
    } catch (error) {
        // Handle any errors
        console.error('Error in createVerifyController:', (error as Error).message);
        res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: (error as Error).message
        });
    }
};


// get all verify info
const getAllVerifyInFo = catchAsync(async (req, res) => {
 
    const result = await verifyService.getAllVerifyfromDB();
  
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "retrieve success",
      data: result,
    });
  });

export const verifyController={
    createVerifyController,
    getAllVerifyInFo
}