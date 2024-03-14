require('dotenv').config();
//prisma client 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//express app
const app = require('./app');

//port 
const port = process.env.PORT || 4000;

//routes 
const purchaseRoutes = require('./src/routes/purchaseRoutes.js');
const supplierRoutes = require('./src/routes/supplierRoutes.js');
const medicineRoutes = require('./src/routes/medicineRoutes.js');
const stockRoutes = require('./src/routes/stockRoutes.js');
const patientRoutes = require('./src/routes/patientRoutes.js');
const categoryRoutes = require('./src/routes/categoryRoutes.js');
const ExpressError = require('./src/utils/ExpressError.js');

app.use('/api/purchase', purchaseRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/category',categoryRoutes);
app.all('*', (req, res) => {
    throw new ExpressError('Page Not Found', 404);
});


app.use((err, req, res, next)=>
{
    const {statusCode = 500, message = "Something went wrong"} = err;
    res.status(statusCode).json({ok: false, data:[],  message});
})
app.listen(port, () => {
    console.log("Server is running on port 4000");
});