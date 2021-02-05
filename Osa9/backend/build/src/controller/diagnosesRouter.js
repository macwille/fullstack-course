"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const diagnoseService_1 = __importDefault(require("../services/diagnoseService"));
const diagnoseRouter = express_1.default.Router();
const diagnoses = diagnoses_1.default;
diagnoseRouter.get('/', (_req, res) => {
    res.send(diagnoses);
});
diagnoseRouter.get('/:code', (req, res) => {
    const { code } = req.params;
    const diagnose = diagnoseService_1.default.getCode(code);
    if (diagnose) {
        res.send(diagnose);
    }
    else {
        res.status(400).send('No diagnosis found');
    }
});
diagnoseRouter.post('/', (_req, res) => {
    res.send('Saving a patient!');
});
exports.default = diagnoseRouter;
