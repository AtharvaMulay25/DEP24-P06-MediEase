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

    return res.json({
        ok: true,
        data: {
            checkup: daysList
        },
        message: "Checkup Stat for current month retrieved successfully"
    });
};

// @desc    Get Top Medicine Stat 
// route    GET /api/dashboard/medicine
// @access  Private (Admin)
const getTopMedicineStat = async (req, res, next) => {
    const stocks = await prisma.stock.findMany({
        select: {
            id: true,
            medicineId: true,
            inQuantity: true,
            outQuantity: true,
            Medicine: true, 
        },
    });

    // console.log("stocks : ", stocks);

    const sortedStocks = stocks.map(stock => ({
        saltName: stock.Medicine.saltName,
        qty: stock.inQuantity - stock.outQuantity,
    })).sort((a, b) => b.availableQuantity - a.availableQuantity).slice(0, Math.min(stocks.length, 5));

    return res.json({
        ok: true,
        data: {
            medicine: sortedStocks
        },
        message: "Checkup Stat for current month retrieved successfully"
    });
};



module.exports = {
    getCheckupStat,
    getTopMedicineStat
};