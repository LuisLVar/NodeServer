"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controllers/apiController");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/getAlumnos', apiController_1.apiController.getAlumnos);
    }
}
const apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
