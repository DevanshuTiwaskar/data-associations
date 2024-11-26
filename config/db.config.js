const mongoose = require("mongoose");
const { UserModel, ProductModel, SaleModel } = require("../models/models");

async function connectDB() {
    await mongoose.connect("mongodb://127.0.0.1:27017/data-associations");
    console.log("connected to db");
}

connectDB();

module.exports = mongoose.connection;