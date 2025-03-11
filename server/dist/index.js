"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const cors = require("cors")();
const port = 4000;
const router = require("./router");
const connection = require("./models");
const app = express();
app.use(express.json());
app.use(cors);
app.use(router);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection;
        console.log("Connected to database");
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    }
    catch (err) {
        console.log(err);
    }
}))();
