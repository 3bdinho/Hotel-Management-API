const asyncHandler = require("express-async-handler");

const apiFeatures = require("../utils/apiFeatures");
const sendResponse = require("../utils/sendResponse");
const ApiError = require("../utils/ApiError");

// createOne(Model)
exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (!Object.keys(req.body).length)
      return next(new ApiError("Request body cannot be empty", 400));

    const newDoc = await Model.create(req.body);

    sendResponse(res, 201, newDoc);
  });

// getOne(Model, populateOptions)
exports.getOne = (Model, populateOptions = null) =>
  asyncHandler(async (req, res, next) => {
    //Setup search filter
    let filterObj = { isActive: { $ne: false }, ...(req.filterObject || {}) };

    // get id from params
    const { id } = req.params;

    // 1-Build query
    let query = Model.findOne({ _id: id, ...filterObj });

    if (populateOptions) query = query.populate(populateOptions);

    // 2- Excecute query
    const doc = await query;
    if (!doc) return next(new ApiError(`${Model.modelName} not found`, 404));

    sendResponse(res, 200, doc);
  });

// updateOne(Model)
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    if (!Object.keys(req.body).length)
      return next(new ApiError("Request body cannot be empty", 400));

    const { id } = req.params;
    const disallowedFields = ["_id", "createdAt"];
    disallowedFields.forEach((field) => delete req.body[field]);

    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new ApiError(`${Model.modelName} not found`, 404));
    }

    sendResponse(res, 200, doc);
  });

// deleteOne(Model)
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });

    if (!doc) return next(new ApiError(`${Model.modelName} not found`, 404));

    sendResponse(res, 200, doc);
  });

// getAll(Model, options)
// options = { populate: 'path', searchFields: ['name','desc'] }
exports.getAll = (Model, options = {}) =>
  asyncHandler(async (req, res, next) => {
    // build base query
    let filterObj = { isActive: { $ne: false }, ...(req.filterObject || {}) };

    const documentsCounts = await Model.countDocuments();
    const features = new apiFeatures(Model.find(filterObj), req.query)
      .filter()
      .search(options.searchFields || [])
      .sort()
      .limitFields()
      .paginate(documentsCounts);

    // Execute query
    const { query, paginationResult } = features;
    const documents = await query;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
