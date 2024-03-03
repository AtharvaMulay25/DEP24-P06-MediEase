const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const createUser = async() => {
    const user = await prisma.supplier.findMany({});
    console.log(user);
    return user;
};

createUser();