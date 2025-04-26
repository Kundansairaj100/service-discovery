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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
// ID
let id = 0;
let ser_name = "";
let ser_service = "";
// Express App
const app = (0, express_1.default)();
// Body-parsing middleware
app.use(express_1.default.json());
// Log-On
app.post("/activate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name;
    const service = req.body.service;
    const response = yield axios_1.default.post("http://localhost:3000/entry", {
        name: name,
        service: service
    });
    //@ts-ignore
    id = response.data.id;
    ser_name = name;
    ser_service = service;
    res.json({
        message: response.data
    });
}));
// Log-Off
app.delete("/deactivate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const response = yield axios_1.default.delete(`http://localhost:3000/remove?id=${id}`);
    const message = response ? "Server Deactivated Successfull" : "Issue Occured while deactivating Server";
    res.json({
        message: message
    });
}));
// Server Details
app.get("/", (req, res) => {
    res.json({
        message: "Server Details",
        name: ser_name,
        service: ser_service
    });
});
// Requesting Another server details
app.get("/server", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const response = yield axios_1.default.get(`http://localhost:3000/server?id=${id}`);
    !(response.data == null) ? res.json({ message: "Server details fetched successfully", data: response.data }) : res.json({ message: "The server dosen't exist" });
}));
app.listen(3001);
console.log(`The Server is running on ${3001}`);
