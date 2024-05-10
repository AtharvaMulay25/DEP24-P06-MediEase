// const roleMapping = new Map([
//     [1, "DOCTOR_DASHBOARD"],
//     [2, "PHARMA_DASHBOARD"],
//     [3, "REQUESTS"],
//     [4, "STOCK"],
//     [5, "MEDICINE"],
//     [6, "PURCHASE"],
//     [7, "SUPPLIER"],
//     [8, "PATIENT"],
//     [9, "PRESCRIPTION"],
//     [10, "STAFF"],
//     [11, "SCHEDULE"],
//     [12, "ADMIN"],
//     [13, "ADMIN_DASHBOARD"],
//     [14, "DOCTOR_SCHEDULE"],
//     [15, "STAFF_PROFILE"],
//     [16, "PATIENT_PROFILE"],
    // [17, "MEDICAL_HISTORY"],
    // [18, "PRESCRIPTION_DETAIL"],
    // [19, "ADMIN_PROFILE"],
// ]);

const roleMapping = new Map([
    [1, "DOCTOR_DASHBOARD"],
    [2, "PHARMA_DASHBOARD"],
    [3, "ADMIN_DASHBOARD"],
    [4, "STOCK_LIST"],
    [5, "OUT_OF_STOCK"],
    [6, "ADD_CATEGORY"],
    [7, "CATEGORY_LIST"],
    [8, "ADD_MEDICINE"],
    [9, "MEDICINE_LIST"],
    [10, "EXPIRED_MEDICINE"],
    [11, "ADD_PURCHASE"],
    [12, "PURCHASE_LIST"],
    [13, "ADD_SUPPLIER"],
    [14, "SUPPLIER_LIST"],
    [15, "ADD_PATIENT"],
    [16, "PATIENT_LIST"],
    [17, "ADD_PRESCRIPTION"],
    [18, "PRESCRIPTION_LIST"],
    [19, "ADD_STAFF"],
    [20, "STAFF_LIST"],
    [21, "ADD_SCHEDULE"],
    [22, "SCHEDULE_LIST"],
    [23, "ADD_ADMIN"],
    [24, "ADMIN_LIST"],
    [25, "DOCTOR_SCHEDULE"],
    [26, "REQUESTS"],
    [27, "PATIENT_PROFILE"],
    [28, "STAFF_PROFILE"],
    [29, "MEDICAL_HISTORY"],
    [30, "ADMIN_PROFILE"],
    [31, "PRESCRIPTION_DETAIL"],
    [32, "PURCHASE_DETAIL"],
]);

const roleMap = (role) => {
    if (role !== "ADMIN" && role !== "DOCTOR" && role !== "PARAMEDICAL" && role !== "PATIENT") {
        return [];
    }
    const admin = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 30];
    const paramedical = [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 28, 30];
    const doctor = [1, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 21, 22, 28, 30];
    const patient = [18, 25, 27, 29, 30];  //Temp solution: patient is also allowed the access of 18 (prescription list), as he/she has to give access to medical history

    let roleArr = [];

    switch (role) {
        case "ADMIN":
            roleArr = admin.map(it => roleMapping.get(it));
            break;
        case "DOCTOR":
            roleArr = doctor.map(it => roleMapping.get(it));
            break;
        case "PARAMEDICAL":
            roleArr = paramedical.map(it => roleMapping.get(it));
            break;
        case "PATIENT":
            roleArr = patient.map(it => roleMapping.get(it));
            break;
        default:
            break;
    }

    return roleArr;
};

export default roleMap;