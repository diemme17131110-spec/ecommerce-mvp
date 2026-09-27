
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET ALL USERS
exports.getUsers = async (req, res) => {
    const users = await prisma.user.findMany({
        include: {
            Role: true,
            MemberShip: true
        }
    });

    res.json(users);
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
        where: { uid: id },
        include: {
            Role: true,
            MemberShip: true
        }
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    const id = Number(req.params.id);

    const { fullname, roleid, mid } = req.body;

    const user = await prisma.user.update({
        where: { uid: id },
        data: {
            fullname,
            roleid,
            mid
        }
    });

    res.json(user);
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    const id = Number(req.params.id);

    await prisma.user.delete({
        where: { uid: id }
    });

    res.json({
        message: "User deleted"
    });
};