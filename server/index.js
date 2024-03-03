const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const createUser = async() => {
    const user = await prisma.person.create({
        data: {
            "id": "xyz",
            x: "1",
            y: "2",
        }
    });
    return user;
};

createUser();