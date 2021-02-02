"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patientsRouter_1 = __importDefault(require("./src/controller/patientsRouter"));
const diagnosesRouter_1 = __importDefault(require("./src/controller/diagnosesRouter"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
const PORT = 3001;
app.get('/api/ping', (_req, res) => {
    console.log('server ping');
    res.send('pong');
});
app.use('/api/patients', patientsRouter_1.default);
app.use('/api/diagnoses', diagnosesRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
