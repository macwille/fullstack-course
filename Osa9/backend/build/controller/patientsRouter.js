"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewPatientEntry_1 = __importDefault(require("../utils/toNewPatientEntry"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNoSSN());
});
patientRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.send(patientService_1.default.getNoSSN());
});
patientRouter.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry_1.default(req.body);
        const newDiaryEntry = patientService_1.default.addPatient(newPatient);
        res.json(newDiaryEntry);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
exports.default = patientRouter;
