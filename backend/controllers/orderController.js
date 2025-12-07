const Order = require('../models/Order');
const Cart = require('../models/Cart');
const sendEmail = require('../utils/sendEmail'); // Import added

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;

    try {
        if (orderItems && orderItems.length === 0) {
            res.status(400).json({ message: 'No order items' });
            return;
        } else {
            // 1. Save Order
            const order = new Order({
                user: req.user._id,
                items: orderItems,
                totalPrice,
                status: 'Pending'
            });

            const createdOrder = await order.save();

            // 2. Clear Cart
            await Cart.findOneAndDelete({ user: req.user._id });

            // 3. Send Email (Try-Catch block to prevent crash if email fails)
            try {
                const message = `
                    <h1>Thank You for Your Order!</h1>
                    <p>Order ID: <strong>${createdOrder._id}</strong></p>
                    <p>Total Amount: <strong>₹${totalPrice}</strong></p>
                    <h3>Order Items:</h3>
                    <ul>
                        ${orderItems.map(item => `<li>${item.name} - ${item.size} (x${item.qty})</li>`).join('')}
                    </ul>
                    <p>We will ship your items soon!</p>
                `;

                await sendEmail({
                    email: req.user.email, // User email from DB
                    subject: 'Order Confirmation - Pasovit Clothings',
                    message
                });
                console.log('Email sent successfully');
            } catch (emailError) {
                console.error('Email could not be sent:', emailError.message);
                // Note: Order save aindi, but email vellaledu. Parledu.
            }

            res.status(201).json(createdOrder);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addOrderItems };