import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Product from '../models/product.js'
import APIFilters from '../utils/apiFilters.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import mongoose from 'mongoose';

// Get All Products => api/v1/products
export const getProducts = catchAsyncErrors(async (req, res) => {
    const resPerPage = 4;
    const apiFilters = new APIFilters(Product, req.query).search().filters();

    console.log("req?.user", req?.user)

    let products = await apiFilters.query;
    let filteredProductsCount = products.length;
    apiFilters.pagination(resPerPage)
    products = await apiFilters.query.clone()

    res.status(200).json({
        resPerPage,
        filteredProductsCount,
        products
    })
});

// Create the new Product => api/v1/admin/products
export const newProduct = catchAsyncErrors(async (req, res) => {
    console.log("user body:", req.body.user);
    req.body.user = req.user._id;
    console.log("user _id:", req.user._id);
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    })
});

//Get Product By Id => api/v1/products/:id
export const getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        product
    })
});

//Update The Product Details => api/v1/products/:id
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, { new: true })

    // Connect MongoDB at default port 27017.
    mongoose.connect('mongodb://localhost:27017/DB Name', {
        useNewUrlParser: true,
        useCreateIndex: true,
    }, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ' + err)
        }
    });

    res.status(200).json({
        success: true,
        product,
    })
});

//Delete Product => api/v1/products/:id
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await product.deleteOne();

    res.status(200).json({
        message: "Product Deleted"
    })
});


//Create/Update Product Review => api/v1/reviews
export const createProductReview = catchAsyncErrors(async (req, res, next) => {

    const { rating, comment, productId } = req.body

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    const isReviewed = product?.reviews.find((rev) => rev.user.toString() === req?.user?._id.toString())

    if (isReviewed) {

        if (review?.user?.toString() === req?.user?._id.toString()) {
            review.comment = comment;
            review.rating = rating;
        }

    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
});

// Get All Reviews => /api/v1/reviews
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    res.status(200).json({
        reviews: product.reviews,
    });
});

//Delete Review => api/v1/admin/reviews
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.query.productId);
    if (!product) return next(new ErrorHandler("Product not found", 404));

    const reviews = product?.reviews?.filter((review) => review._id.toString() !== req?.query?.reviewId.toString());

    const numOfReviews = reviews.length;

    const ratings = numOfReviews === 0 ? 0 : product.reviews.reduce((acc, cur) => cur.rating + acc, 0) / numOfReviews;

    product = await Product.findByIdAndUpdate(req.query.productId, { reviews, numOfReviews, ratings }, { new: true });

    res.status(200).json({
        success: true,
        message: "Review Deleted Successfully",
    });

});