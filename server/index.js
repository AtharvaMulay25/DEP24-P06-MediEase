require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const app = require('./app');
const port = process.env.PORT || 4000;


const createUser = async() => {
    const user = await prisma.supplier.findMany({});
    console.log(user);
    return user;
};

createUser();
app.listen(port, () => {
    console.log("Server is running on port 4000");
});