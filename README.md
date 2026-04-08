# 🛍️ Hayami — E-Commerce Website

A fully designed, multi-page e-commerce website built with **HTML**, **CSS**, and **JavaScript (+ jQuery)**. Hayami lets users browse products by category, view detailed product pages, manage a shopping cart, and complete checkout — all in a clean, responsive interface.

---

## 📁 Project Structure

```
hayami/
├── index.html               # Home Page
├── products.html            # Products Listing Page
├── product-view.html        # Single Product View Page
├── category.html            # Category Page
├── cart.html                # Cart Page
├── checkout.html            # Checkout Page
├── order-confirmation.html  # Order Confirmation Page
├── about.html               # About Us Page
├── contact.html             # Contact Us Page
├── search.html              # Search Results Page
├── css/
│   └── style.css            # Global Stylesheet
└── js/
    └── script.js            # JavaScript & jQuery Logic
```

---

## 📄 Pages & Features

### 🏠 Home Page (`index.html`)
- Navbar (shared across all pages)
- Hero image sliders
- Shop by Category section
- Latest Products showcase
- Features / highlights section
- Footer (shared across all pages)
- Scroll to Top button (shared across all pages)

### 🛒 Products Page (`products.html`)
- Full product listing grid
- Category filter sidebar
- Price range filter

### 🔍 Product View Page (`product-view.html`)
- Product title, images, description
- Price and star ratings
- Related products section
- Add to Cart button

### 🗂️ Category Page (`category.html`)
- Category list with title, images, and short descriptions

### 🧺 Cart Page (`cart.html`)
- Cart items list with images, title, quantity controls
- Per-item price and total amount display

### 💳 Checkout Page (`checkout.html`)
- Order summary panel
- Shipping information form

### ✅ Order Confirmation Page (`order-confirmation.html`)
- Confirmation message
- Order number and order status

### 🏢 About Us Page (`about.html`)
- Brand story with images and text
- Key features / values section
- Customer testimonials

### 📬 Contact Us Page (`contact.html`)
- Contact info (address, email, phone)
- Contact form with **JavaScript & jQuery form validation**

### 🔎 Search Page (`search.html`)
- Dynamic search results listing

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure and markup |
| CSS3 | Styling, layout, responsiveness |
| JavaScript | Interactivity and dynamic behavior |
| jQuery | DOM manipulation, form validation |

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hayami.git
   ```

2. **Open in browser**
   ```bash
   cd hayami
   open index.html
   ```
   > No build tools or server required — it runs entirely in the browser.

---

## ✨ Common Components

The following components appear on **every page**:
- **Navbar** — navigation links to all pages
- **Footer** — site info, links, and socials
- **Scroll to Top Button** — smooth scroll back to the top

---

## 📌 Notes

- All form validation on the Contact Us page is handled via **JavaScript and jQuery**
- The project is a **frontend-only** implementation (no backend or database)
- Designed to be responsive across desktop and mobile screens

---

## 📃 License

This project was built as part of an internship assignment from [InternshipStudio](https://internshipstudio.com).
