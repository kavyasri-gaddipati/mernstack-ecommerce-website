const Cart = require('../models/Cart');


const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name price image category');
        
        if (!cart) {
            return res.json({ items: [] }); 
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
const addToCart = async (req, res) => {
    const { productId, size, qty } = req.body;

    try {
        let cart = await Cart.findOne({ user: req.user._id });

        // Cart lekapothe kothadi create cheyu
        if (!cart) {
            cart = new Cart({ user: req.user._id, items: [] });
        }

        // Product already cart lo unda?
        const itemIndex = cart.items.findIndex(p => p.product.toString() === productId && p.size === size);

        if (itemIndex > -1) {
            // Unte quantity penchu
            cart.items[itemIndex].qty += qty;
        } else {
            // Lekapothe kotha item add cheyu
            cart.items.push({ product: productId, size, qty });
        }

        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (cart) {
            // Filter use chesi item ni remove chestunnam
            cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, removeFromCart };