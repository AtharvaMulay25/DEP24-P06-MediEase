const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ExpressError = require("../utils/ExpressError");
const { daysInMonthList, daysInMonth } = require("../utils/daysInMonthList");

// @desc    Get Checkup Stat
// route    GET /api/dashboard/checkup
// @access  Private (Admin)
const getCheckupStat = async (req, res, next) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    
    // console.log("startDate: " + startDate);
    // console.log("endDate: " + endDate);

    const checkupList = await prisma.checkup.findMany({
        where: {
            date: {
                gte: new Date(startDate),
                lte: new Date(endDate),
            },
        },
        select: {
            id: true,
            date: true,
        }
    });

    // console.log("checkup list: " + checkupList[0].date.getDate());
    
    const { daysList } = await daysInMonthList(currentDate.getMonth(), currentDate.getFullYear());
    
    for (const checkup of checkupList) {
        const day = checkup.date.getDate()-1;
        daysList[day].total++; 
    }

    //finding the checkups 
    const user = req.user;
    if (!user) {
        throw new ExpressError("User not authorized, Please login again", 401);
    }

    let checkupCount = 0, userEmail = user.email;
    if (user.role === "ADMIN") {
        const checkups = await prisma.checkup.findMany({});
        checkupCount = checkups.length;
    } else if (user.role === "DOCTOR" || user.role === "PARAMEDICAL") {
        //getting the staffid 
        const staffId = (await prisma.staff.findUnique({
            where: {
                email: userEmail,
            },
            select: {
                id: true,
            }
        })).id;

        const checkups = await prisma.checkup.findMany({
            where: {
                [user.role === "DOCTOR" ? "doctorId" : "staffId"]: staffId,
            },
        });
        checkupCount = checkups.length;
    }

    return res.json({
        ok: true,
        data: {
            checkup: daysList,
            checkupCount
        },
        message: "Checkup Stat for current month retrieved successfully"
    });
};

// @desc    Get Top Medicine Stat 
// route    GET /api/dashboard/medicine
// @access  Private (Admin)
const getTopMedicineStat = async (req, res, next) => {
    const stocks = await prisma.stock.findMany({
        where: {
            stock: {
                gt: 0
            }
        },
        select: {
            id: true,
            medicineId: true,
            inQuantity: true,
            outQuantity: true,
            Medicine: true, 
        },
    });

    const pendingRequests = await prisma.requests.findMany({});

    // console.log("stocks : ", stocks);
    
    
    let totalS = 0, totalM = stocks.length;
    const sortedStocks = stocks.map(stock => {
        totalS += stock.inQuantity - stock.outQuantity;
        return {
        saltName: stock.Medicine.saltName,
        qty: stock.inQuantity - stock.outQuantity,
    }}).sort((a, b) => b.availableQuantity - a.availableQuantity).slice(0, Math.min(stocks.length, 5));

    return res.json({
        ok: true,
        data: {
            medicine: sortedStocks,
            totalS,
            totalM,
            pendingRequestsCount: pendingRequests.length
        },
        message: "Pending requests and checkup stats for current month retrieved successfully"
    });
};

module.exports = {
    getCheckupStat,
    getTopMedicineStat,
};