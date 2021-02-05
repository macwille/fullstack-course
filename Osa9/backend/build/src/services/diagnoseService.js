"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diagnoses_1 = __importDefault(require("../../data/diagnoses"));
const generateID = () => {
    const id = Math.floor(Math.random() * 99999999);
    return id.toString();
};
const getEntries = () => {
    return diagnoses_1.default;
};
const getCode = (byCode) => {
    const diagnosis = diagnoses_1.default.find(d => d.code === byCode);
    return diagnosis;
};
const addEntry = (entry) => {
    const newEntry = Object.assign({ id: generateID() }, entry);
    diagnoses_1.default.push(newEntry);
    return newEntry;
};
exports.default = {
    getEntries,
    getCode,
    addEntry
};
