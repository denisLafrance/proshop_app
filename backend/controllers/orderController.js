import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


// @desc - create new order
// @route - POST /api/orders
// @access - private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        const createdOrder = await order.save();

        res.status(201).json(createdOrder)
    }
})


// @desc - get order by id
// @route - GET  /api/orders/:id
// @access - private
const getOrderById = asyncHandler(async (req, res) => {
   
    const id = req.params.id;
    const order = await Order.findById(id).populate('user', 'name email');

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
   
})

// @desc - get user order
// @route - GET  /api/orders/myorders
// @access - private
const getMyOrders = asyncHandler(async (req, res) => {
   
    //const id = req.params.id;
    const orders = await Order.find({user: req.user._id});
    res.json(orders)
   
   
})

// @desc - update order to paid
// @route - GET  /api/orders/:id/pay
// @access - private
const updateOrderToPaid = asyncHandler(async (req, res) => {
   
    const id = req.params.id;
    const order = await Order.findById(id);

    if(order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updated_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else {
        res.status(404)
        throw new Error('Order not found')
    }
   
})




export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}


