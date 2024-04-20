const roleMapping = new Map([
    [1, "DOCTOR_DASHBOARD"],
    [2, "PHARMA_DASHBOARD"],
    [3, "REQUESTS"],
    [4, "STOCK"],
    [5, "MEDICINE"],
    [6, "PURCHASE"],
    [7, "SUPPLIER"],
    [8, "PATIENT"],
    [9, "PRESCRIPTION"],
    [10, "STAFF"],
    [11, "SCHEDULE"],
    [12, "ADMIN"],
    [13, "ADMIN_DASHBOARD"],
    [14, "DOCTOR_SCHEDULE"],
    [15, "STAFF_PROFILE"],
    [16, "PATIENT_PROFILE"],
    [17, "MEDICAL_HISTORY"],
    [18, "PRESCRIPTION_DETAIL"],
    [19, "ADMIN_PROFILE"],
]);

const roleMap = (role) => {
    if (role !== "ADMIN" && role !== "DOCTOR" && role !== "PARAMEDICAL" && role !== "PATIENT") {
        return [];
    }
    const admin = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 18, 19];
    const patient = [14, 16, 17, 18];
    const paramedical = [2, 4, 5, 6, 7, 8, 9, 10, 11, 15, 18];
    const doctor = [1, 4, 5, 8, 9, 10, 11, 15, 18];

    let roleArr = [];

    switch(role) {
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