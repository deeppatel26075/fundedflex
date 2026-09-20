# FundedFlex 🪙
> **TRADE | GROW | FREEDOM**
> Premium Simulated Funded Trading Account Platform

FundedFlex is an ultra-luxury, fintech-grade simulated proprietary trading platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Prisma SQLite.

---

## ✨ Features

- **🏆 Luxury Gold Aesthetic**: Built with a private-equity aesthetic, metallic gold branding, real-time interactive market visualizers, and glassmorphic HUD.
- **⚡ Simulated Account Marketplace**: Tiered accounts ranging from $5,000 to $200,000 with dynamic 80/20 to 90/10 reward splits and competitive drawdown thresholds.
- **🪙 Direct Crypto Checkout**: Multi-currency cryptocurrency checkout supporting USDT (TRC20 & ERC20), USDC (ERC20), Bitcoin (BTC), and Ethereum (ETH) with QR codes and copy-to-clipboard functionality.
- **🛡️ Manual Payment Verification Workflow**: Customer submits transaction hash (`PAYMENT_PENDING_REVIEW`) with deep-links to blockchain explorers (Tronscan, Etherscan, Blockchain.com).
- **🔑 Automatic Credential Generation**: One-click admin approval automatically provisions unique MT5 Account IDs (`FF-XXXXXX`), usernames, and cryptographically secure passwords encrypted via AES-256-GCM.
- **📊 Trader Dashboard**: Clean trader portal with active challenge stats, drawdown monitoring meters, and single-click reveal/copy for trading credentials.
- **🛠️ Executive Admin Suite**: Full control panel to review and approve orders, edit product pricing and rules, and manage crypto deposit addresses in real time.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/deeppatel26075/fundedflex.git
   cd fundedflex
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Initialize the Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.js
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Architecture

- **Authentication**: Stateless, secure HTTP-only session cookies with JSON Web Tokens (JWT).
- **Data Protection**: Sensitive credentials encrypted at rest using AES-256-GCM with PBKDF2 key derivation.
- **Auditing**: Explicit manual approval flow for blockchain transactions preventing unauthorized account provisioning.

---

## 📜 License
Private & Proprietary. All rights reserved by FundedFlex.
