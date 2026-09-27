
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // Role
    await prisma.role.createMany({
        data: [
            { rolename: "Admin" },
            { rolename: "Customer" }
        ],
        skipDuplicates: true
    });

    // Membership
    await prisma.membership.createMany({
        data: [
            { mname: "Silver", score: 100 },
            { mname: "Gold", score: 500 },
            { mname: "Platinum", score: 1000 }
        ],
        skipDuplicates: true
    });

    // Product
    await prisma.product.createMany({
        data: [
            {
                pname: "iPhone 15",
                price: 25000000,
                quantity: 20
            },
            {
                pname: "MacBook Air M2",
                price: 28000000,
                quantity: 10
            },
            {
                pname: "AirPods Pro",
                price: 5000000,
                quantity: 30
            }
        ],
        skipDuplicates: true
    });

    console.log("Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });