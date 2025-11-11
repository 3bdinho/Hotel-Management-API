const sendResponse = (res, statusCode, data, meta) => {
  const response = { status: "success", data };
  if (meta) response.meta = meta;
  res.status(statusCode).json(response);
};

module.exports = sendResponse;
