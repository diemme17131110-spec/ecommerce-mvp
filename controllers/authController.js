
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

exports.register = async (req, res) => {
    try {
        const { username, fullname, password } = req.body;

        const exist = await prisma.user.findUnique({
            where: { username }
        });

        if (exist) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                fullname,
                password: hashedPassword,
                roleid: 2,
                mid: 1
            }
        });

        res.status(201).json({
            message: "Register success",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            {
                uid: user.uid,
                username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            token
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};