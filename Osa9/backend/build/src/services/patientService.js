"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const generateID = () => {
    const id = Math.floor(Math.random() * 99999999);
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
const getID = (byId) => {
    const filtered = patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => ({
        id,
        ssn,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: [],
    }));
    const patient = filtered.find(p => p.id === byId);
    return patient;
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: generateID() }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNoSSN,
    getID,
    addPatient
};
