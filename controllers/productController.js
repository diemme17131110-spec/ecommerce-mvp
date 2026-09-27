const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL
exports.getProducts = async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
};

// GET ONE
exports.getProductById = async (req, res) => {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
        where: { pid: id }
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
};

// CREATE
exports.createProduct = async (req, res) => {
    const { pname, price, quantity } = req.body;

    const product = await prisma.product.create({
        data: {
            pname,
            price,
            quantity
        }
    });

    res.status(201).json(product);
};

// UPDATE
exports.updateProduct = async (req, res) => {
    const id = Number(req.params.id);

    const { pname, price, quantity } = req.body;

    const product = await prisma.product.update({
        where: { pid: id },
        data: {
            pname,
            price,
            quantity
        }
    });

    res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.product.delete({
        where: { pid: id }
    });

    res.json({
        message: "Product deleted"
    });
};