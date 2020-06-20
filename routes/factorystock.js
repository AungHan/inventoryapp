const express = require('express');
const router = express.Router();
const FactoryStockTransaction = require("../models/factoryStockTransaction");
const Product = require("../models/product");

// list all factory stock transactions
router.route("/").get(async (req, res) => {
   try{
      let allStockTransactions = await FactoryStockTransaction.find();
      return res.render("factorystocks/index", {
         stockTransactions: allStockTransactions,
      });
   }
   catch(err){
      console.log(`Error while fetching factory stock transaction: ${err.message}`);
      res.redirect("back");
   }
});

// show new transaction form
router.route("/new").get(async (req, res) => {
   try{
      let products = await Product.find();
      return res.render("factorystocks/new", {
         products: products
      });
   }
   catch (e) {
      console.log("Error while fetching products");
      res.redirect("/factorystocks");
   }
});

// create new transaction
router.route("/new").post(async(req, res) => {
   try{
      const asOfDate = Date.parse(req.body.stock.transactionDate);
      const quantity = Number(req.body.stock.quantity);
      const productPrice = Number(req.body.stock.price);
      const totalAmount = Number(req.body.stock.totalAmount);
      const differentAmount = quantity * productPrice - totalAmount;
      const transactionType = req.body.stock.transactionType;
      const newStockTransaction = new FactoryStockTransaction({
         asOfDate,
         quantity,
         productPrice,
         totalAmount,
         differentAmount,
         transactionType
      });
      newStockTransaction.product = await Product.findOne({ name: req.body.stock.productName });

      console.log(newStockTransaction);
      await newStockTransaction.save();
      console.log("new stock transaction saved..");
   }
   catch (e) {
      console.log("Error while adding new stock transaction : " + e.message);
   }
   res.redirect("/factorystocks");
});

// show detail view of transaction

// edit transaction form
router.route("/:id/edit").get(async(req, res) => {
   try{
      const editStock = await FactoryStockTransaction.findOne({ _id: req.params.id });
      const products = await Product.find();

      res.render("factorystocks/edit", {
         stockTransaction: editStock,
         products: products
      });
   }catch (e) {
      console.log("Error while searching stock transaction : " + e.message);
      res.redirect("/factorystocks");
   }
});

// update transaction
router.route("/:id").put(async (req, res) => {
   try{
      const editStock = await FactoryStockTransaction.findOne({ _id: req.params.id });
      editStock.asOfDate = Date.parse(req.body.stock.transactionDate);
      editStock.quantity = Number(req.body.stock.quantity);
      editStock.productPrice = Number(req.body.stock.price);
      editStock.totalAmount = Number(req.body.stock.totalAmount);
      editStock.differentAmount = quantity * productPrice - totalAmount;
      editStock.transactionType = req.body.stock.transactionType;
      editStock.product = await Product.findOne({ name: req.body.stock.productName });

      console.log(editStock);
      await editStock.save();
      console.log("edited stock transaction saved..");
   }catch(e){
      console.log("Error while updating stock transaction : " + e.message);
   }
   res.redirect("/factorystocks");
});

// delete transaction
router.route("/:id").delete(async (req, res) => {
   try{
      await FactoryStockTransaction.deleteOne({ _id: req.params.id });
   }catch (err) {
      console.log(err);
   }
   res.redirect("/factorystocks");
});

module.exports = router;
