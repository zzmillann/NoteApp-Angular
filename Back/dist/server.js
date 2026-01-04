"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const configPipeline_1 = __importDefault(require("./configexpress/configPipeline"));
const app = express();
require('dotenv').config();
(0, configPipeline_1.default)(app);
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});
//# sourceMappingURL=server.js.map