import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Tender } from "../models/tenderSchema.js";
import { Application } from "../models/applicationSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllTenders = catchAsyncErrors(async (req, res, next) => {
  const tenders = await Tender.find({ expired: false });
  res.status(200).json({
    success: true,
    tenders,
  });
});

export const postTender = catchAsyncErrors(async (req, res, next) => {
  const { role,_id } = req.user;
  if (role === "Bidder") {
    return next(
      new ErrorHandler("Bidder not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    startTime,
    endTime,
    bufferTime,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full Tender details.", 400));
  }

  if (!startTime || !endTime || !bufferTime) {
    return next(
      new ErrorHandler("Please enter start, end and buffer time.", 400)
    );
  }
  const postedBy = req.user._id;
  const tender = await Tender.create({
    title,
    description,
    category,
    country,
    city,
    location,
    startTime,
    endTime,
    bufferTime,
    postedBy,
  });

  

  res.status(200).json({
    success: true,
    message: "Tender Posted Successfully!",
    tender,
  });
});


export const getMyTenders = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Bidder") {
    return next(
      new ErrorHandler("Bidder not allowed to access this resource.", 400)
    );
  }
  const myTenders = await Tender.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myTenders,
  });
});

export const updateTender = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Bidder") {
    return next(
      new ErrorHandler("Bidder not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let tender = await Tender.findById(id);
  if (!tender) {
    return next(new ErrorHandler("OOPS! Tender not found.", 404));
  }
  tender = await Tender.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Tender Updated!",
  });
});

export const deleteTender = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Bidder") {
    return next(
      new ErrorHandler("Bidder not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const tender = await Tender.findById(id);
  if (!tender) {
    return next(new ErrorHandler("OOPS! Tender not found.", 404));
  }
  await tender.deleteOne();
  res.status(200).json({
    success: true,
    message: "Tender Deleted!",
  });
});

export const getSingleTender = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const tender = await Tender.findById(id);
    if (!tender) {
      return next(new ErrorHandler("Tender not found.", 404));
    }
    const lowest = await Application.findOne({ tenderId: id }).sort({ amount: 1 });
    res.status(200).json({
      success: true,
      tender,
      lowest,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});


export const updateTenderEndTime = async (tenderId, bufferTime) => {
  try {
    const tender = await Tender.findById(tenderId);
    if (tender) {
      tender.endTime = new Date(tender.endTime.getTime() + bufferTime * 60000);
      await tender.save();
    }
  } catch (error) {
    console.error('Error extending tender end time:', error);
  }
};