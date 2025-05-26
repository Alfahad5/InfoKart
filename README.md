# 🛒 Infokart - E-Commerce Web App

![Home Page](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Home1.png)

## 🌟 Overview

This is a full-stack **MERN E-Commerce Web Application** built with **Tailwind CSS** for styling. The app includes **User & Admin panels**, where users can browse, search, and add items to their cart, while admins can manage products and customize the website.

## 🔥 Features

### 👥 **User Panel**

- 🛍️ **Shop by Categories** – Browse products by category.
- 🔍 **Search Functionality** – Quickly find products.
- 🛒 **Add to Cart & Purchase** – Users can add items to the cart and proceed to checkout.
- 🔑 **Authentication Required** – Users must log in to add products to the cart.

### 🛠️ **Admin Panel**

- 🏗️ **CRUD Products** – Add, edit, and delete products.
- 📌 **Manage Widgets** – Modify the header & footer dynamically.
- 🔗 **Add Custom Links & Text** – If the link exists, it redirects within the app; otherwise, it goes to a **404 page**.

## 📸 Screenshots

| Admin Panel - Products                                                                         | Admin Panel - Widgets                                                                          |
| ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ![Admin Panel 1](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/AdminPanel1.png) | ![Admin Panel 2](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/AdminPanel2.png) |

| Home Page                                                                            | Home Page (Alternate View)                                                           |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| ![Home Page](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Home1.png) | ![Home Page](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Home2.png) |

| 🛒 Cart                                                                        | 📂 Category Page                                                                       |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| ![Cart](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Cart.png) | ![Category](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Category.png) |

| 🔍 Search Functionality                                                            |
| ---------------------------------------------------------------------------------- |
| ![Search](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Search.png) |

## 🔗 Direct Image Links

- **Admin Panel - Products:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/AdminPanel1.png)
- **Admin Panel - Widgets:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/AdminPanel2.png)
- **Home Page:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Home1.png)
- **Home Page (Alternate View):** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Home2.png)
- **Cart Page:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Cart.png)
- **Category Page:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Category.png)
- **Search Page:** [View](https://raw.githubusercontent.com/alfahad5/InfoKart/main/img/Search.png)

## 🚀 Tech Stack

### **Backend (Server)**

- 🌍 **Express.js** – Backend framework.
- 🛡️ **JWT Authentication** – Secure user authentication.
- 🔐 **Bcrypt.js** – Password hashing.
- 📂 **Multer** – File uploads.
- 🗄️ **MongoDB & Mongoose** – Database management.
- 🌐 **CORS & Cookie-parser** – Security & sessions.

### **Frontend (Client)**

- ⚛️ **React.js** – Frontend library.
- 🎨 **Tailwind CSS** – Styling.
- 🖼️ **Material-UI & Icons** – UI components.
- 🔄 **React Router DOM** – Navigation.
- 📦 **Axios** – API calls.
- 🎠 **React-Slick & Multi-Carousel** – Product carousels.

## 📜 Dependencies

### **Backend**

```json
{
  "bcryptjs": "^3.0.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.10.1",
  "multer": "^1.4.5-lts.1",
  "nodemon": "^3.1.9"
}
```

### **Frontend**

```json
{
  "@mui/material": "^6.4.4",
  "@mui/icons-material": "^6.4.4",
  "axios": "^1.7.9",
  "bcryptjs": "^3.0.1",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "jsonwebtoken": "^9.0.2",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.1.5",
  "react-slick": "^0.30.3",
  "slick-carousel": "^1.8.1"
}
```

## 📌 Notes

- The admin panel has full **CRUD functionality**.
- Users can only **add items to the cart if logged in**.
- The **header/footer dynamically updates** based on admin inputs.
- Unrecognized links redirect to a **404 page**.

---

🎯 _Feel free to contribute or report issues!_
