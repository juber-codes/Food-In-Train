// // import React, { useContext, useState } from 'react';
// // import './PlaceOrder.css';
// // import { StoreContext } from '../../context/StoreContext';
// // import axios from 'axios';

// // const PlaceOrder = () => {
// //   const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

// //   const [data, setData] = useState({
// //     firstName: "", lastName: "", email: "",
// //     street: "", city: "", state: "",
// //     zipcode: "", country: "", phone: "",
// //     seat_no: "", train_no: ""
// //   });

// //   const onChangeHandler = (e) => {
// //     const { name, value } = e.target;
// //     setData(prev => ({ ...prev, [name]: value }));
// //   };

// //   const placeOrder = async (e) => {
// //     e.preventDefault();

// //     if (!token) { alert("Please login first!"); return; }

// //     let orderItems = [];
// //     food_list.forEach(item => {
// //       if (cartItem[item._id] > 0) orderItems.push({ ...item, quantity: cartItem[item._id] });
// //     });

// //     if (orderItems.length === 0) { alert("Cart is empty!"); return; }

// //     // Calculate subtotal in paise
// //     let subtotal = orderItems.reduce(
// //       (sum, item) => sum + item.price * item.quantity * 100,
// //       0
// //     );

// //     let deliveryFee = 200; // ₹2 = 200 paise
// //     let totalAmount = subtotal + deliveryFee;

// //     if (totalAmount < 3000) totalAmount = 3000; // minimum ₹30 for Stripe

// //     const orderData = {
// //       address: data,
// //       items: orderItems,
// //       amount: totalAmount
// //     };

// //     try {
// //       const response = await axios.post(
// //         url + "/api/order/place",
// //         orderData,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       if (response.data.success) window.location.href = response.data.session_url;
// //       else alert(response.data.message || "Error placing order");
// //     } catch (err) {
// //       console.log("Place order error:", err.response?.data || err.message);
// //       alert("Error placing order! Check console.");
// //     }
// //   };

// //   return (
// //     <form onSubmit={placeOrder} className='place-order'>
// //       <div className="place-order-left">
// //         <p className="title">Delivery Information</p>
// //         <div className="multi-filed">
// //           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
// //           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
// //         </div>
// //         <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' />
// //         <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
// //         <div className="multi-filed">
// //           <input required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
// //           <input required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
// //         </div>
// //         <div className="multi-filed">
// //           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
// //           <input required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
// //           <input required name='seat_no' onChange={onChangeHandler} value={data.seat_no} placeholder='Seat No' />
// //           <input required name='train_no' onChange={onChangeHandler} value={data.train_no} placeholder='Train No' />
// //         </div>
// //         <input required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
// //       </div>

// //       <div className="place-order-right">
// //         <div className="cart-total">
// //           <h2>Cart Totals</h2>
// //           <div className='cart-total-details'>
// //             <p>Subtotal</p>
// //             <p>₹{getTotalCartAmount()}</p>
// //           </div>
// //           <div className='cart-total-details'>
// //             <p>Delivery fee</p>
// //             <p>₹2</p>
// //           </div>
// //           <div className='cart-total-details'>
// //             <b>Total</b>
// //             <b>₹{Math.max(getTotalCartAmount() + 2, 30)}</b>
// //           </div>
// //           <button type='submit'>PROCEED TO PAYMENT</button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default PlaceOrder;

// import React, { useContext, useState } from 'react';
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';

// const PlaceOrder = () => {
//   const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

//   const [data, setData] = useState({
//     firstName: "", lastName: "", email: "",
//     street: "", city: "", state: "",
//     zipcode: "", country: "", phone: "",
//     seat_no: "", train_no: ""
//   });

//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setData(prev => ({ ...prev, [name]: value }));
//   };

//   const placeOrder = async (e) => {
//     e.preventDefault();

//     if (!token) { alert("Please login first!"); return; }

//     let orderItems = [];
//     food_list.forEach(item => {
//       if (cartItem[item._id] > 0) orderItems.push({ ...item, quantity: cartItem[item._id] });
//     });

//     if (orderItems.length === 0) { alert("Cart is empty!"); return; }

//     // Calculate subtotal in paise for Stripe
//     let subtotalPaise = orderItems.reduce(
//       (sum, item) => sum + item.price * item.quantity ,
//       0
//     );

//     let deliveryFeePaise = 200; // ₹2 = 200 paise
//     let totalAmountPaise = subtotalPaise + deliveryFeePaise;

//     if (totalAmountPaise < 3000) totalAmountPaise = 3000; // minimum ₹30 for Stripe

//     const orderData = {
//       address: data,
//       items: orderItems,
//       amount: totalAmountPaise
//     };

//     try {
//       const response = await axios.post(
//         url + "/api/order/place",
//         orderData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (response.data.success) window.location.href = response.data.session_url;
//       else alert(response.data.message || "Error placing order");
//     } catch (err) {
//       console.log("Place order error:", err.response?.data || err.message);
//       alert("Error placing order! Check console.");
//     }
//   };

//   const navigate = useNavigate();

//   useEffect(()=>{
//       if(!token){
//         navigate('/cart')

//       }
//       else if(getTotalCartAmount()===0){
//         navigate("/cart")
//       }
//   },[token])

//   return (
//     <form onSubmit={placeOrder} className='place-order'>
//       <div className="place-order-left">
//         <p className="title">Delivery Information</p>
//         <div className="multi-filed">
//           <input required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
//           <input required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
//         </div>
//         <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' />
//         <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
//         <div className="multi-filed">
//           <input required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
//           <input required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
//         </div>
//         <div className="multi-filed">
//           <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
//           <input required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
//           <input required name='seat_no' onChange={onChangeHandler} value={data.seat_no} placeholder='Seat No' />
//           <input required name='train_no' onChange={onChangeHandler} value={data.train_no} placeholder='Train No' />
//         </div>
//         <input required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
//       </div>

//       <div className="place-order-right">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div className='cart-total-details'>
//             <p>Subtotal</p>
//             <p>₹{getTotalCartAmount()}</p> {/* Display subtotal in ₹ */}
//           </div>
//           <div className='cart-total-details'>
//             <p>Delivery fee</p>
//             <p>₹2</p> {/* Display delivery fee in ₹ */}
//           </div>
//           <div className='cart-total-details'>
//             <b>Total</b>
//             <b>₹{Math.max(getTotalCartAmount() + 2, 30)}</b> {/* Display total in ₹ */}
//           </div>
//           <button type='submit'>PROCEED TO PAYMENT</button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default PlaceOrder;

import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Added missing import
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const navigate = useNavigate();  // ✅ Moved above useEffect

  const [data, setData] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipcode: "", country: "", phone: "",
    seat_no: "", train_no: ""
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!token) { alert("Please login first!"); return; }

    let orderItems = [];
    food_list.forEach(item => {
      if (cartItem[item._id] > 0)
        orderItems.push({ ...item, quantity: cartItem[item._id] });
    });

    if (orderItems.length === 0) { alert("Cart is empty!"); return; }

    // Calculate subtotal in paise for Stripe
    let subtotalPaise = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let deliveryFeePaise = 200; // ₹2 = 200 paise
    let totalAmountPaise = subtotalPaise + deliveryFeePaise;

    if (totalAmountPaise < 3000) totalAmountPaise = 3000; // minimum ₹30 for Stripe

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmountPaise
    };

    try {
      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success)
        window.location.href = response.data.session_url;
      else alert(response.data.message || "Error placing order");
    } catch (err) {
      console.log("Place order error:", err.response?.data || err.message);
      alert("Error placing order! Check console.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-filed">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} placeholder='Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
        <div className="multi-filed">
          <input required name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
        </div>
        <div className="multi-filed">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
          <input required name='seat_no' onChange={onChangeHandler} value={data.seat_no} placeholder='Seat No' />
          <input required name='train_no' onChange={onChangeHandler} value={data.train_no} placeholder='Train No' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <div className='cart-total-details'>
            <p>Delivery fee</p>
            <p>₹2</p>
          </div>
          <div className='cart-total-details'>
            <b>Total</b>
            <b>₹{Math.max(getTotalCartAmount() + 2, 30)}</b>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
