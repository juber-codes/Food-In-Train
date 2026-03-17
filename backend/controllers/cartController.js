// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// const placeOrder = async (req, res) => {
//   const frontend_url = process.env.FRONTEND_URL;

//   try {
//     const userId = req.user.id; // from auth middleware
//     const { items, address } = req.body;

//     if (!items || items.length === 0)
//       return res.status(400).json({ success: false, message: "Cart is empty" });

//     // Validate items prices
//     for (let item of items) {
//       if (!item.price || item.price <= 0)
//         return res.status(400).json({ success: false, message: "Item price invalid" });
//     }

//     // Save order in DB
//     const newOrder = new orderModel({
//       userId,
//       items,
//       amount: items.reduce((acc, i) => acc + i.price * i.quantity, 0) + 10, // delivery fee
//       address,
//       status: "pending",
//     });
//     await newOrder.save();

//     // Clear user cart
//     await userModel.findByIdAndUpdate(userId, { cartData: {} });

//     // Stripe line items
//     const line_items = items.map(item => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100), // in paise
//       },
//       quantity: item.quantity,
//     }));

//     // Add delivery fee
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: { name: "Delivery Fee" },
//         unit_amount: 10 * 100,
//       },
//       quantity: 1,
//     });

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items,
//       mode: "payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });

//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.error("PlaceOrder Error:", error);
//     res.status(500).json({ success: false, message: "Error placing order", error: error.message });
//   }
// };

// // Dummy exports
// const verifyOrder = () => {};
// const userOrders = () => {};
// const listOrders = () => {};
// const updateStatus = () => {};

// export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };

import userModel from "../models/userModel.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const cartData = user.cartData || {};
    const { itemId } = req.body;

    cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    const cartData = user.cartData || {};
    const { itemId } = req.body;

    if (cartData[itemId] > 1) cartData[itemId] -= 1;
    else delete cartData[itemId];

    await userModel.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true, message: "Removed from cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing from cart" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart" });
  }
};

export { addToCart, removeFromCart, getCart };
