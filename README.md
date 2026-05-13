# 📦 LokerPintar - Next.js Smart Locker Template

A modern, highly-premium web application template designed for **Smart Locker** rentals. Built using **Next.js 14**, **Tailwind CSS**, and **Prisma** with **Neon Serverless Postgres** support. Ready to integrate with the **Midtrans Payment Gateway**.

---

## 🚀 Features
- **Modern & Premium UI:** Glassmorphism design, dark mode aesthetics, and micro-animations via Framer Motion.
- **Complete Booking Flow:** Location selection, service type, duration & quantity calculation.
- **Database Ready:** Pre-configured with Prisma schema and SQL for Neon Serverless PostgreSQL.
- **Vercel Deployment Ready:** Optimized build steps and `.env` handling.
- **Midtrans Prepared:** UI logic streamlined for Midtrans Snap redirect/drop-in UI.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS & Lucide Icons
- **Animation:** Framer Motion
- **State Management:** Zustand
- **Database ORM:** Prisma
- **Database Provider:** Neon Serverless (PostgreSQL)

---

## 📖 Installation Guide

Follow these steps to run the project locally on your machine.

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- A [Neon Database](https://neon.tech) Account (for PostgreSQL)

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/next-js-payment-template-main.git
cd next-js-payment-template-main
```

### 3. Install Dependencies
Install all the required packages using npm, yarn, pnpm, or bun.
```bash
npm install
```

### 4. Setup Environment Variables
1. Duplicate the `.env.example` file and rename it to `.env`.
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and fill in your **Neon Serverless Database URL**:
   ```env
   DATABASE_URL="postgres://username:password@host.neon.tech/dbname?sslmode=require"
   ```

### 5. Setup the Database (Prisma)
Push the predefined database schema to your Neon server.
```bash
npx prisma db push
```
*(Optional) If you want to view or edit the data visually, you can open Prisma Studio:*
```bash
npx prisma studio
```

### 6. Run the Development Server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result!

---

## 🌐 Deployment to Vercel
Deploying to Vercel is extremely simple because the project is already pre-configured.

1. Push your code to a GitHub repository.
2. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add your `DATABASE_URL`.
5. Click **Deploy**! 

*(The `package.json` already contains `"postinstall": "prisma generate"`, so Vercel will automatically generate the database client during the build).*

---

> **Note:** This template is developed for educational purposes and provides a solid foundation for implementing payment gateway solutions like Midtrans.
