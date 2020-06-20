const mongoose = require("mongoose");

const factoryStockTransactionSchema = new mongoose.Schema({
    product: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: String
    },
    quantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    differentAmount: { type: Number, required: true },
    transactionType: { type: String, required: true },
    asOfDate: { type: Date, required: true }
}, {
    timestamps: true
});

// e.g. price : {type: Number, get: getPrice, set: setPrice }
// function getPrice(num){
//     return (num/100).toFixed(2);
// }
//
// function setPrice(num){
//     return num*100;
// }

module.exports = mongoose.model("FactoryStockTransaction", factoryStockTransactionSchema);
