"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs");
const app = (0, express_1.default)();
app.get('/users', async (req, res) => {
    res.json('akak');
});
app.listen(configs_1.envConfig.PORT, () => {
    console.log('Working, port listen :', configs_1.envConfig.PORT);
});
//# sourceMappingURL=app.js.map