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
    ["GET_CHECKUP_LIST", ["D", "A", "PM"]],
    ["GET_CHECKUP_DETAILS", ["D", "A", "PM"]],
    ["CREATE_CHECKUP", ["D", "A", "PM"]],
    ["UPDATE_CHECKUP", ["D", "A", "PM"]],
    ["DELETE_CHECKUP", ["D", "A", "PM"]],

    // dashboard routes
    ["GET_CHECKUP_STAT", ["D", "A", "PM"]],
    ["GET_TOP_MEDICINE_STAT", ["D", "A", "PM"]],

    // medicine routes
    ["GET_MEDICINE_LIST", ["D", "A", "PM"]],
    ["GET_EXPIRED_MEDICINE", ["D", "A", "PM"]],
    ["CREATE_MEDICINE_LIST", ["D", "A", "PM"]],
    ["UPDATE_MEDICINE_LIST", ["D", "A", "PM"]],
    ["DELETE_MEDICINE_LIST", ["D", "A", "PM"]],
    
    // patient routes
    ["GET_PATIENT_LIST", ["D", "A", "PM"]],
    ["CREATE_PATIENT", ["D", "A", "PM"]],
    ["UPDATE_PATIENT", ["D", "A", "PM"]],
    ["DELETE_PATIENT", ["D", "A", "PM"]],

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
    ["CREATE_SCHEDULE", ["D", "A", "PM"]],
    ["UPDATE_SCHEDULE", ["D", "A", "PM"]],
    ["DELETE_SCHEDULE", ["D", "A", "PM"]],
    
    // staff routes 
    ["GET_STAFF_LIST", ["D", "A", "PM"]],
    ["CREATE_STAFF", ["D", "A", "PM"]],
    ["UPDATE_STAFF", ["D", "A", "PM"]],
    ["DELETE_STAFF", ["D", "A", "PM"]],
    
    // stock routes 
    ["GET_TOTAL_STOCK", ["D", "A", "PM"]],
    ["GET_AVAILABLE_STOCK", ["D", "A", "PM"]],
    ["GET_OUT_OF_STOCK", ["D", "A", "PM"]],
    
    // supplier routes 
    ["GET_SUPPLIER_LIST", ["A", "PM"]],
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