import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Tender } from "../models/tenderSchema.js";
import { updateTenderEndTime } from './tenderController.js';

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Tender Manager") {
    return next(
      new ErrorHandler("Tender Manager not allowed to access this resource.", 400)
    );
  }
  
  const { name, amount, tenderId } = req.body;
  const applicantID = {
    user: req.user._id,
    role: "Bidder",
  };
  if (!tenderId) {
    return next(new ErrorHandler("Tender not found!", 404));
  }
  const tenderDetails = await Tender.findById(tenderId);
  if (!tenderDetails) {
    return next(new ErrorHandler("Tender not found!", 404));
  }

  const tenderManagerID = {
    user: tenderDetails.postedBy,
    role: "Tender Manager",
  };
  if (
    !name ||
    !amount ||
    !applicantID ||
    !tenderManagerID
  ) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }
  const isLateBid = new Date(tenderId.endTime) - new Date() <= 5 * 60000;
  const application = await Application.create({
    name,
    amount,
    applicantID,
    tenderManagerID,
    isLateBid,
  });

  if (isLateBid) {
    await updateTenderEndTime(tenderId, tenderDetails.bufferTime);
  }

  // Update the lowest bid if necessary
  if (tenderDetails.lowest === null || amount < tenderDetails.lowest) {
    tenderDetails.lowest = amount;
    await tenderDetails.save();
  }

  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    application,
  });
});

export const tendermanagerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Bidder") {
      return next(
        new ErrorHandler("Bidder not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "tenderManagerID.user": _id }).sort({amount:1});
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const bidderGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Tender Manager") {
      return next(
        new ErrorHandler("Tender Manager not allowed to access this resource.", 400)
      );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const bidderDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    const { role } = req.user;
    if (role === "Tender Manager") {
      return next(
        new ErrorHandler("Tender Manager not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next(new ErrorHandler("Application not found!", 404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application Deleted!",
    });
  }
);
