const mongoose = require('mongoose');
const FactoryStockTransaction = require('./models/factoryStockTransaction');
const Product = require('./models/product');

const products = [
    { name: 'Wheat', type: 'Powder', description: 'wheat des' },
    { name: 'Corn', type: 'Seed', description: 'corn des' },
    { name: 'Rice', type: 'other', description: 'rice des' },
];

const stocks = [
    {
        asOfDate: Date.parse("2020-06-18T00:00:00.000+00:00"),
        productPrice: 10,
        quantity: 5,
        totalAmount: 50,
        differentAmount: 0,
        transactionType: 'IN'
    },
    {
        asOfDate: Date.parse("2020-06-19T00:00:00.000+00:00"),
        productPrice: 15,
        quantity: 10,
        totalAmount: 150,
        differentAmount: 0,
        transactionType: 'IN'
    },
    {
        asOfDate: Date.parse("2020-06-19T00:00:00.000+00:00"),
        productPrice: 20,
        quantity: 5,
        totalAmount: 100,
        differentAmount: 0,
        transactionType: 'OUT'
    },
];


function seedDB(){
    FactoryStockTransaction.deleteMany({}, err => {
        console.log(err || 'removed old data...');
        Product.deleteMany({}, () => {});

        // add default data
        for (let i=0;i<stocks.length;i++){
            FactoryStockTransaction.create(stocks[i], (err, newStock) => {
                if(err){
                    console.log(err);
                }else{
                    Product.create(products[i], (err, newProduct) => {
                        if(err) {
                            console.log(err);
                        }else {
                            newStock.product.id = newProduct._id;
                            newStock.product.name = newProduct.name;
                            newProduct.save();

                            newStock.save();
                            console.log("saved stocks and products")
                        }
                    })
                }
            });
        }
    });
}

module.exports = seedDB;
