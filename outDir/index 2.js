"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const items = [];
const port = 30;
const app = (0, express_1.default)();
app.use((0, cors_1.default)()),
    app.use(body_parser_1.default.json()),
    app.get("/items", (req, res) => {
        res.status(200).send(items);
    });
app.get("/items", (req, res) => {
    if (!req.body)
        return res.status(400).send("No body provided");
    const item = req.body;
    if (!item.email) {
        item.email = req.body;
    }
    items.push(item);
    res.status(200).send(items);
});
app.listen(port, () => {
    console.log('Now listening on port: ' + port);
});
