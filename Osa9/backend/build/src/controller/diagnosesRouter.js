"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const diagnoseRouter = express_1.default.Router();
const diagnoses = diagnoses_1.default;
diagnoseRouter.get('/', (_req, res) => {
    res.send(diagnoses);
});
diagnoseRouter.post('/', (_req, res) => {
    res.send('Saving a patient!');
});
exports.default = diagnoseRouter;
