const ExpressError = require("./utils/ExpressError");
const {
  medicineSchema,
  supplierSchema,
  staffSchema,
  scheduleSchema,
  stockSchema,
  patientSchema,
  purchaseListSchema,
  purchaseSchema,
  categorySchema,
  sendOtpSchema,
  verifyOtpSchema,
  userSchema,
  checkupSchema,
  feedbackSchema,
} = require("./schemas");

module.exports.validateMedicine = (req, res, next) => {
  const { error } = medicineSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateSupplier = (req, res, next) => {
  const { error } = supplierSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateStaff = (req, res, next) => {
  const { error } = staffSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateSchedule = (req, res, next) => {
  const { error } = scheduleSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateStock = (req, res, next) => {
  const { error } = stockSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validatePatient = (req, res, next) => {
  const { error } = patientSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validatePurchaseList = (req, res, next) => {
  const { error } = purchaseListSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validatePurchase = (req, res, next) => {
  const { error } = purchaseSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
module.exports.validateCheckup = (req, res, next) => {
  const { error } = checkupSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCategory = (req, res, next) => {
  const { error } = categorySchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateCheckup = (req, res, next) => {
  const { error } = checkupSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateSendOtp = (req, res, next) => {
  const { error } = sendOtpSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateVerifyOtp = (req, res, next) => {
  const { error } = verifyOtpSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};


module.exports.validateFeedback = (req, res, next) => {
  const { error } = feedbackSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};