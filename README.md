# 🚆 IRCTC Food Order Website (Full Stack Project)

This project is a **Food Ordering System for Train Passengers**, inspired by IRCTC services.
It allows users to **order food during train journeys**, while admins can manage orders, menus, and users through an admin panel.

---

## 🚀 Features

### 👤 User (Frontend)

* 🔍 Browse food items (tea, coffee, meals, snacks)
* 🛒 Add items to cart
* 🧾 Enter passenger details (Name, Train No, Seat No)
* 📦 Place order
* 💳 View total bill
* 📧 (Optional) Email confirmation

---

### 🛠️ Admin Panel

* 🔐 Admin login system
* 📋 View all orders
* ➕ Add / Edit / Delete food items
* 📊 Manage menu and pricing
* 👥 Manage users (optional)

---

### ⚙️ Backend

* 🧠 Handles business logic
* 📦 Processes orders
* 🔗 Connects frontend with database
* 🔒 Secure API handling

---

## 🛠️ Technologies Used

### 🌐 Frontend

* HTML
* CSS
* JavaScript
* (Optional: Bootstrap / Tailwind)

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB

---



## ▶️ How to Run

### 🔹 1. Clone Repository

```bash id="0i3hss"
git clone https://github.com/your-username/IRCTC-Food-Order.git
```

---

### 🔹 2. Go to Backend Folder

```bash id="z3ywd8"
cd IRCTC-Food-Order/backend
```

---

### 🔹 3. Install Dependencies

```bash id="ps0ypp"
npm install
```

---

### 🔹 4. Setup Environment Variables

Create a `.env` file:

```id="6cvq2h"
PORT=5000
MONGO_URI=your_mongodb_connection
EMAIL=your_email
PASSWORD=your_password
```

---

### 🔹 5. Start Backend Server

```bash id="6f9fqs"
npm start
```

---

### 🔹 6. Run Frontend

* Open `frontend/index.html` in browser
  👉 OR use Live Server in VS Code

---

### 🔹 7. Open Admin Panel

* Open `admin/admin.html`

---

## 🎮 How It Works

1. User selects food items 🍔
2. Adds them to cart 🛒
3. Enters train & seat details 🚆
4. Order is sent to backend ⚙️
5. Admin can view/manage orders 📊

---



## 📌 Future Improvements

* 💳 Online payment integration (Stripe/Razorpay)
* 📱 Mobile responsive UI
* 🔔 Real-time order tracking
* 🌐 Deploy on cloud (Render / Vercel)

---

## ⚠️ Security Note

* Do NOT upload `.env` file
* Keep API keys and database credentials secure

---

## 🙌 Author

* **Juber Atar**

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🛠️ Contribute

---

## 📜 License

This project is open-source and available under the MIT License.
