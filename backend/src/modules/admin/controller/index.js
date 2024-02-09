// import { Router } from "express";

const express = require('express');
const { login, changePassword } = require("./../service/index.js");
const { adminMiddleware } = require("../../../common/middleware/adminMiddleware.js");


// export const adminRoutes = Router();
const adminRoutes = express.Router();

adminRoutes.post("/login", async (req, res) => {
    try {
        const data = await login(req, res);

        // successResponseHandler(res, data)


    } catch (error) {
        // errorResponseHandler(res, error)
        console.log(error)
    }
})

adminRoutes.post('/change-password', adminMiddleware, async (req, res) => {
    try {
        const data = await changePassword(req, res);
        // successResponseHandler(res, data)
    } catch (error) {
        // errorResponseHandler(res, error)
        console.log(error)
    }
})

module.exports = { adminRoutes }