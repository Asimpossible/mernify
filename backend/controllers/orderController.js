import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import Order from '../models/order.js';
import Product from '../models/product.js';
import ErrorHandler from '../utils/ErrorHandler.js';

// Create new order => api/v1/orders/new
export const newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        pamentInfo,
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxAmount,
        shippingAmount,
        totalAmount,
        paymentMethod,
        pamentInfo,
        user: req.user._id
    });

    res.status(200).json({
        order,
    });
})

//Get Current User Orders ==> api/v1/me/orders
export const getMyOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id }).populate("user", "name email");
    const ordersLength = orders.length

    res.status(200).json({
        ordersLength,
        orders
    });
});


//Get order details => api/v1/orders/:id
export const getOrderDetails = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new ErrorHandler("Order not found with this ID", 404));

    res.status(200).json({
        order,
    });
});

//Get All Orders - ADMIN => api/v1/admin/orders
export const allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find();
    const orderAmount = orders.length

    res.status(200).json({
        orderAmount,
        orders,
    });
});

//Update order status - ADMIN => api/v1/admin/orders/:id
export const updateOrder = catchAsyncErrors(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) return next(new ErrorHandler("Order not found with this ID", 404));

    if (order?.orderStatus === "Delivered") return next(new ErrorHandler("You have already delivered this order", 400));

    //Update products stock
    order?.orderItems.forEach(async (item) => {
        const product = await Product.findById(item?.productID?.toString());

        if (!product) return next(new ErrorHandler("Product not found with this ID", 404));

        product.stock = product.stock - item.quantity;
        await product.save({ validateBeforeSave: false });
    });

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
    });
});


//Delete order => api/v1/admin/orders/:id
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) return next(new ErrorHandler("Order not found with this ID", 404));

    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: "Order deleted",
    });
});