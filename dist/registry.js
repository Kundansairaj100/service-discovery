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
const prisma_1 = require("../generated/prisma");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Initializations
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
//cors
app.use((0, cors_1.default)());
// Additional middlewares 
app.use(express_1.default.json());
// All Active server Detials
app.get("/active", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield prisma.server.findMany();
    res.json({
        message: "Active Servers Fetch Successfull",
        data: response
    });
}));
// Individual Server Details
app.get("/server", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    let id = req.query.id;
    const p_id = +id;
    const response = yield prisma.server.findUnique({
        where: {
            id: p_id
        }
    });
    if (response) {
        res.json({
            message: "Server is Active",
            data: response
        });
    }
    else {
        res.json({
            message: "Server is Inactive OR Invalid Server if"
        });
    }
}));
// Server Log-On
app.post("/entry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const service = req.body.service;
    const response = yield prisma.server.create({
        data: {
            name,
            service
        }
    });
    const message = response ? "Server Successfully Registered" : "There was some issue SERVER not Registered";
    res.json({
        message: message,
        data: response
    });
}));
// Server Log-Of
app.delete("/remove", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    let id = req.query.id;
    const p_id = +id;
    const response = yield prisma.server.delete({
        where: {
            id: p_id
        }
    });
    const message = response ? "Server Details removed" : "There was some issue SERVER not removed";
    res.json({
        message: message
    });
}));
//Global Catches
app.use((err, req, res) => {
    res.json({
        message: "Whoops Server died"
    });
});
app.listen(3000);
console.log(`Port Runnning on ${3000}`);
