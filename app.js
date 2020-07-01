const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const FactoryStockTransaction = require('./models/factoryStockTransaction');
const methodOverride = require('method-override');
const authRoutes = require('./routes/index');
const factoryStockRoutes = require('./routes/factorystock');
const bodyParser = require('body-parser');
const seedDB = require('./seed');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require('./models/user');
const flash = require('connect-flash');

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

// app config
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
app.use(require("express-session")({
    secret: "macbookpros",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//seedDB();
// middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// routing config
app.use("/", authRoutes);
app.use("/factorystocks", factoryStockRoutes);

app.listen(5000, () => {
    console.log('Server is running at port : ' + 5000);
});
