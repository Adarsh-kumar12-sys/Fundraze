# 🚀 Fundraze

Fundraze is a full-stack MERN platform that connects **startup founders** with **potential investors**. Founders can list their startups, upload pitch videos, and set funding terms. Investors can explore opportunities, receive AI-generated bid suggestions, and manage their investment offers.

---

## 🔑 Features

- 🧑‍💼 Separate registration/login for Founders and Investors
- 🧾 Founders can create and manage startup listings with videos
- 💸 Investors can view startups and place funding bids
- ✅ Founders can accept or reject bids directly from the dashboard
- 🤖 **Founder AI Assistant** (Gemini API): Helps founders improve pitch content and funding terms
- 📊 **Investor Smart Bidding** (Gemini API): AI suggests ideal bid amount, equity, and royalty
- 📦 Direct Cloudinary video uploads from frontend
- 🔒 Protected routes with role-based JWT auth (cookies used)
- 🔔 Toast notifications for success and error feedback
- ⚙️ Fully CORS-safe cross-domain login (with credentials)

---

## 🧰 Tech Stack

| Frontend     | Backend           | Database | File Uploads | Auth             | AI Integration       |
|--------------|-------------------|----------|--------------|------------------|----------------------|
| React + Vite | Node.js + Express | MongoDB  | Cloudinary   | JWT + HttpOnly Cookies | Gemini API (Google AI) |

---

## 🧠 AI Features (Gemini API)

### 🧑‍💼 Founder Assistant
- Helps generate better pitch descriptions
- Explains equity vs. royalty in simple terms
- Improves funding language and startup clarity

### 💼 Investor Smart Bidding
- Reads startup details (capital, industry, traction)
- Suggests optimal bid with amount, equity, and royalty %
- Enhances decision-making using contextual AI insights

---

## 🛠️ Setup Instructions

### 📦 Backend Setup (`server-fundraze`)

```bash
cd server-fundraze
npm install
