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

app.use('/api/purchase', purchaseRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/medicine', medicineRoutes);
app.use('/api/stock', stockRoutes);


app.listen(port, () => {
    console.log("Server is running on port 4000");
});