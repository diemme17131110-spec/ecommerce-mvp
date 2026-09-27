
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getShipments = async (req, res) => {
    const shipments = await prisma.shipment.findMany({
        include: {
            order: true
        }
    });

    res.json(shipments);
};

exports.createShipment = async (req, res) => {
    const { oid, status } = req.body;

    const shipment = await prisma.shipment.create({
        data: {
            oid,
            status
        }
    });

    res.status(201).json(shipment);
};

exports.updateShipment = async (req, res) => {
    const id = Number(req.params.id);

    const shipment = await prisma.shipment.update({
        where: { shipid: id },
        data: {
            status: req.body.status
        }
    });

    res.json(shipment);
};