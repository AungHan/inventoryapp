const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const FactoryStockTransaction = require('./models/factoryStockTransaction');
const methodOverride = require('method-override');
const authRoutes = require('./routes/index');
const factoryStockRoutes = require('./routes/factorystock');
const bodyParser = require('body-parser');
const seedDB = require('./seed');

// app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

// db config
mongoose.connect("mongodb://localhost:27017/inventorydb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongoose db connected...');
});

//seedDB();

// routing config
app.use("/", authRoutes);
app.use("/factorystocks", factoryStockRoutes);

app.listen(5000, () => {
    console.log('Server is running at port : ' + 5000);
});
