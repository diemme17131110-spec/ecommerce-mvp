
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                orderDetails: {
                    include: {
                        product: true
                    }
                },
                shipments: true
            }
        });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const order = await prisma.order.findUnique({
            where: { oid: id },
            include: {
                user: true,
                orderDetails: {
                    include: {
                        product: true
                    }
                },
                shipments: true
            }
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE ORDER
exports.createOrder = async (req, res) => {
    try {
        const { uid, items } = req.body;

        const order = await prisma.order.create({
            data: {
                uid,
                createat: new Date(),
                orderDetails: {
                    create: items.map(item => ({
                        pid: item.pid,
                        qty: item.qty,
                        unit_price: item.unit_price
                    }))
                }
            },
            include: {
                orderDetails: true
            }
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { uid } = req.body;

        const order = await prisma.order.update({
            where: { oid: id },
            data: { uid }
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.order.delete({
            where: { oid: id }
        });

        res.json({
            message: "Order deleted"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};