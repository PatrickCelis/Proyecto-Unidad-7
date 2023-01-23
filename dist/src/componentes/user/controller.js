"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = exports.findAll = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate_1 = require("../authenticate");
const secret_key = process.env.SECRET_KEY || 'Alguna llave secreta';
const prisma = new client_1.PrismaClient();
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, authenticate_1.verify_authentication)(req, secret_key)) {
            const users = yield prisma.user.findMany();
            res.status(200).json({
                ok: true,
                data: users,
            });
        }
        else {
            res.status(400).json({ ok: false, message: 'failed authentication' });
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.findAll = findAll;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        data.last_session = data.last_session || null;
        data.update_at = data.update_at || null;
        const encrypted_password = yield bcrypt_1.default.hash(data.password, 10);
        const new_user = {
            name: data.name,
            email: data.email,
            password: encrypted_password,
            last_session: data.last_session,
            update_at: data.update_at,
            date_born: new Date(data.date_born)
        };
        const user = yield prisma.user.create({ data: new_user });
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
            expiresIn: 86400
        });
        res.status(201).json({ ok: true, message: "Usuario creado correctamente", data: user, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({ where: { email: email } });
        if (user == null) {
            res.status(400).json({ ok: false, message: "El correo electrónico es incorrecto" });
        }
        else {
            const is_valid = yield bcrypt_1.default.compare(password, user.password);
            if (is_valid) {
                const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secret_key, {
                    expiresIn: 86400
                });
                res.status(201).json({ ok: true, message: "Login exitoso", data: user, token: token });
            }
            else {
                res.status(400).json({ ok: false, message: "Contraseña incorrecta" });
            }
        }
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
});
exports.login = login;
//# sourceMappingURL=controller.js.map