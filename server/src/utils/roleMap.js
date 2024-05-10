const roleMapping = new Map([
    // admin routes 
    ["GET_ADMIN_LIST", ["A"]],
    ["CREATE_ADMIN", ["A"]],
    ["UPDATE_ADMIN", ["A"]],
    ["DELETE_ADMIN", ["A"]],
    
    // category routes
    ["GET_CATEGORY_LIST", ["D", "A", "PM"]],
    ["GET_CATEGORY", ["D", "A", "PM"]],
    ["CREATE_CATEGORY", ["D", "A", "PM"]],
    ["UPDATE_CATEGORY", ["D", "A", "PM"]],
    ["DELETE_CATEGORY", ["D", "A", "PM"]],
    
    // checkup routes
    ["GET_MEDICAL_HISTORY", ["P"]],
    ["GET_CHECKUP_DETAILS", ["D", "A", "PM", "P"]],
    ["GET_CHECKUP_LIST", ["D", "A", "PM"]],
    ["CREATE_CHECKUP", ["D", "A", "PM"]],
    ["UPDATE_CHECKUP", ["D", "A", "PM"]],
    ["DELETE_CHECKUP", ["D", "A", "PM"]],

    // dashboard routes
    ["GET_CHECKUP_STAT", ["D", "A", "PM"]],
    ["GET_TOP_MEDICINE_STAT", ["D", "A", "PM"]],

    // mail routes
    ["APPROVE_REQUEST_CONTROLLER", ["A"]],
    ["REJECT_REQUEST_CONTROLLER", ["A"]],
    ["PENDING_REQUEST_CONTROLLER", ["A"]],
    ["FEEDBACK_SUBMIT_CONTROLLER", ["D", "A", "PM", "P"]],

    // medicine routes
    ["GET_MEDICINE_LIST", ["D", "A", "PM"]],
    ["GET_MEDICINE", ["D", "A", "PM"]],
    ["GET_EXPIRED_MEDICINE", ["D", "A", "PM"]],
    ["CREATE_MEDICINE_LIST", ["D", "A", "PM"]],
    ["UPDATE_MEDICINE_LIST", ["D", "A", "PM"]],
    ["DELETE_MEDICINE_LIST", ["D", "A", "PM"]],
    
    // patient routes
    ["GET_PATIENT_LIST", ["D",  "A", "PM"]],
    ["GET_PATIENT", ["D",  "A", "PM"]],
    ["CREATE_PATIENT", ["D", "A", "PM"]],
    ["UPDATE_PATIENT", ["D", "A", "PM"]],
    ["DELETE_PATIENT", ["D", "A", "PM"]],

    // profile routes
    ["GET_PATIENT_PROFILE", ["P"]],
    ["UPDATE_PATIENT_PROFILE", ["P"]],
    ["DELETE_PATIENT_PROFILE", ["P"]],
    
    ["GET_STAFF_SCHEDULE", ["D", "PM"]],
    ["GET_STAFF_PROFILE", ["D", "PM"]],
    ["UPDATE_STAFF_PROFILE", ["D", "PM"]],
    ["DELETE_STAFF_PROFILE", ["D", "PM"]],

    ["GET_ADMIN_PROFILE", ["A"]],
    ["UPDATE_ADMIN_PROFILE", ["A"]],
    ["DELETE_ADMIN_PROFILE", ["A"]],

    // purchase routes
    ["GET_PURCHASE_LIST", ["A", "PM"]],
    ["GET_PURCHASE_DETAILS", ["A", "PM"]],
    ["CREATE_PURCHASE_LIST", ["A", "PM"]],
    ["UPDATE_PURCHASE_LIST", ["A", "PM"]],
    ["DELETE_PURCHASE_LIST", ["A", "PM"]],

    // request routes
    ["GET_ALL_REQUESTS", ["A"]],
    ["GET_REQUEST", ["A"]],

    // schedule routes 
    ["GET_SCHEDULE_LIST", ["D", "A", "PM", "P"]],
    ["GET_SCHEDULE", ["D", "A", "PM"]],
    ["CREATE_SCHEDULE", ["D", "A", "PM"]],
    ["UPDATE_SCHEDULE", ["D", "A", "PM"]],
    ["DELETE_SCHEDULE", ["D", "A", "PM"]],
    
    // staff routes 
    ["GET_STAFF_LIST", ["D", "A", "PM"]],
    ["GET_STAFF", ["D", "A", "PM"]],
    ["CREATE_STAFF", ["D", "A", "PM"]],
    ["UPDATE_STAFF", ["D", "A", "PM"]],
    ["DELETE_STAFF", ["D", "A", "PM"]],
    
    // stock routes 
    ["GET_TOTAL_STOCK", ["D", "A", "PM"]],
    ["GET_AVAILABLE_STOCK", ["D", "A", "PM"]],
    ["GET_OUT_OF_STOCK", ["D", "A", "PM"]],
    
    // supplier routes 
    ["GET_SUPPLIER_LIST", ["A", "PM"]],
    ["GET_SUPPLIER", ["A", "PM"]],
    ["CREATE_SUPPLIER", ["A", "PM"]],
    ["UPDATE_SUPPLIER", ["A", "PM"]],
    ["DELETE_SUPPLIER", ["A", "PM"]],
]);

const numToRoleMapping = new Map([
    ["A", "ADMIN"],
    ["D", "DOCTOR"],
    ["PM", "PARAMEDICAL"],
    ["P", "PATIENT"]
]);

const roleMap = (route) => {
    let roleArr = [];
    
    if (!roleMapping.has(route)) {
        return roleArr;
    }

    roleArr = roleMapping.get(route);
    roleArr = roleArr.map(role => {
        return numToRoleMapping.get(role); 
    });
     
    return roleArr;
};

module.exports = roleMap;