import mongoose from 'mongoose';
import Product from '../models/product.js';
import products from './data.js';

const seedProducts = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/shopit");

        await Product.deleteMany();
        console.log("All products are deleted");

        await Product.insertMany(products);
        console.log("Products are added");

        process.exit();
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

seedProducts();