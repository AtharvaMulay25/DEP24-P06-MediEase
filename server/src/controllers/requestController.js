const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const ExpressError = require('../utils/ExpressError');


// @desc    Get All Requests
// route    GET /api/request
// @access  Private (Admin)

const getAllRequests = async(req, res, next) => {
    try{
    const requests = await prisma.requests.findMany({});
    // console.log(requests);  
    
    return res.status(200).json({
        ok: true,
        data: requests,
        message: "Requests retrieved successfully"
    });
} catch (err) {
    console.log(`Requests Fetching Error : ${err.message}`);
    
    return res.status(500).json({
        ok: false,
        data: [],
        message: "Fetching Requests failed, Please try again later"
    });

}}

// @desc    Get Single Request
// route    GET /api/request/:id
// @access  Private (Admin)
const getRequest = async(req, res, next) => {
    try {
        const { id } = req.params;
        const request = await prisma.requests.findUnique({
            where: {
                id: id
            }
        });
        // console.log(request);  
        
        return res.status(200).json({
            ok: true,
            data: request,
            message: "Request retrieved successfully"
        });
    } catch (err) {
        console.log(`Request Fetching Error : ${err.message}`);
        
        return res.status(500).json({
            ok: false,
            data: [],
            message: "Fetching Request failed, Please try again later"
        });
    }
}

module.exports = {
    getAllRequests,
    getRequest
}
