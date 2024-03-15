const Joi = require('joi');

// Medicine Schema
const medicineSchema = Joi.object({
  brandName: Joi.string().required(),
  saltName: Joi.string().required(),
  categoryId: Joi.string().required(),
//   Stock: Joi.array().items(Joi.object()),
//   Checkups: Joi.array().items(Joi.object()),
//   Purchases: Joi.array().items(Joi.object()),
//   Category: Joi.object().required(),
});

// Supplier Schema
const supplierSchema = Joi.object({

  name: Joi.string().required(),
  address1: Joi.string().required(),
  address2: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().required(),
  pinCode: Joi.string().optional(),
  mobileNumber: Joi.string().required(),
  email: Joi.string().email().optional(),
//   PurchaseList: Joi.array().items(Joi.object()),
});

// Staff Schema
const staffSchema = Joi.object({

  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('DOCTOR', 'PARAMEDICAL').required(),
  speciality: Joi.string().optional(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
  shiftSchedule: Joi.string().required(),
//   DoctorCheckups: Joi.array().items(Joi.object()),
//   StaffCheckups: Joi.array().items(Joi.object()),
});

// Stock Schema
const stockSchema = Joi.object({

  medicineId: Joi.string().required(),
  stock: Joi.number().integer().required(),
  inQuantity: Joi.number().integer().required(),
  outQuantity: Joi.number().integer().required(),
//   Medicine: Joi.object().required(),
});

// PurchaseList Schema
const purchaseListSchema = Joi.object({

  supplierId: Joi.string().required(),
  purchaseDate: Joi.date().iso().required(),
  invoiceNo: Joi.string().required(),
  Details: Joi.string().optional(),
  Supplier: Joi.object().required(),
//   Purchase: Joi.array().items(Joi.object()),
});

// Category Schema
const categorySchema = Joi.object({

  categoryName: Joi.string().required(),
  strengthType: Joi.string().required(),
//   Medicine: Joi.array().items(Joi.object()),
});

// Purchase Schema
const purchaseSchema = Joi.object({

  purchaseListId: Joi.string().required(),
  medicineId: Joi.string().required(),
  mfgDate: Joi.date().iso().optional(),
  expiryDate: Joi.date().iso().required(),
  batchNo: Joi.string().required(),
  quantity: Joi.number().integer().required(),
//   Medicine: Joi.object().required(),
//   PurchaseList: Joi.object().required(),
});

// Patient Schema
const patientSchema = Joi.object({

  name: Joi.string().required(),
  department: Joi.string().valid('COMPUTER SCIENCE', 'ELECTRICAL', 'MECHANICAL', 'MATHEMATICS & COMPUTING', 'CHEMICAL', 'CIVIL', 'METALLURGY', 'ENGINEERING PHYSICS', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'MATHEMATICS', 'HUMANITIES').optional(),
  dob: Joi.date().iso().required(),
  age: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  bloodGroup: Joi.string().required(),
  program: Joi.string().valid('BTECH', 'MTECH', 'DUAL DEGREE', 'PHD').optional(),
  fatherOrSpouseName: Joi.string().optional(),
  category: Joi.string().valid('STUDENT', 'FACULTY', 'STAFF', 'VISITOR').required(),
  gender: Joi.string().valid('MALE', 'FEMALE').required(),
//   Checkup: Joi.array().items(Joi.object()),
});

// Checkup Schema
const checkupSchema = Joi.object({

  patientId: Joi.string().required(),
  temperature: Joi.number().optional(),
  date: Joi.date().iso().required(),
  bloodPressure: Joi.string().optional(),
  symptoms: Joi.string().optional(),
  diagnosis: Joi.string().required(),
  doctorId: Joi.string().optional(),
  staffId: Joi.string().required(),
  Patient: Joi.object().required(),
//   Doctor: Joi.object().optional(),
//   Staff: Joi.object().required(),
//   Medicines: Joi.array().items(Joi.object()),
});

module.exports = {
  medicineSchema,
  supplierSchema,
  staffSchema,
  stockSchema,
  purchaseListSchema,
  categorySchema,
  purchaseSchema,
  patientSchema,
  checkupSchema,
};