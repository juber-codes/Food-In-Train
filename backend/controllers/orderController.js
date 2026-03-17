
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place a new order
const placeOrder = async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;

  try {
    const userId = req.user.id; // get user from auth middleware
    const { items, amount, address } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    if (!amount || amount < 3000) // minimum ₹30 in paise
      return res.status(400).json({ success: false, message: "Order amount too low" });

    // Save order in DB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      status: "pending",
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Prepare Stripe line items
    const line_items = items.map(item => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name, description: item.description || "" },
        unit_amount: Math.round(item.price * 100), // ₹ to paise
      },
      quantity: item.quantity,
    }));

    // Add delivery fee ₹2 = 200 paise
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200,
      },
      quantity: 1,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error("PlaceOrder Error:", error);
    res.status(500).json({ success: false, message: "Error placing order", error: error.message });
  }
};

// Verify order after payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed or canceled" });
    }
  } catch (error) {
    console.error("VerifyOrder Error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// Fetch orders for logged-in user
const userOrders = async (req, res) => {
  try {
    if (!req.user || !req.user.id)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const userId = req.user.id;
    const orders = await orderModel.find({ userId });

    if (!orders || orders.length === 0)
      return res.status(200).json({ success: true, data: [], message: "No orders found" });

    res.json({ success: true, data: orders });

  } catch (error) {
    console.error("UserOrders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Other routes (dummy for now)
const listOrders =async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders});
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
  
}; // for admin panel
const updateStatus =  async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status updated"})
    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
