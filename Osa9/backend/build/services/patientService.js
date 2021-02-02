"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../data/patients"));
const generateId = () => {
    const id = Math.floor(Math.random() * 999999999999999);
    return id.toString();
};
const getEntries = () => {
    return patients_1.default;
};
const getNoSSN = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const getID = (lookupID) => {
    return lookupID;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: generateId() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNoSSN,
    getID,
    addPatient
};
