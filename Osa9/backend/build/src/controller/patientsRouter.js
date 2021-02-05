"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const toNewEntry_1 = __importDefault(require("../utils/toNewEntry"));
const toNewPatientEntry_1 = __importDefault(require("../utils/toNewPatientEntry"));
const patientRouter = express_1.default.Router();
patientRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNoSSN());
});
patientRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const patient = patientService_1.default.getID(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(400).send('No user found');
    }
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
patientRouter.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const patient = patientService_1.default.getID(id);
    console.log(body);
    if (patient) {
        try {
            const newEntry = toNewEntry_1.default(req.body);
            const updatedPatient = patientService_1.default.addEntry(id, newEntry);
            res.json(updatedPatient);
        }
        catch (e) {
            res.status(400).send(e.message);
        }
        res.send(patient);
    }
    else {
        res.status(400).send('No user found');
    }
});
exports.default = patientRouter;
