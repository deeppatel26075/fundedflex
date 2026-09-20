const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding FundedFlex database...");

  // 1. Create Admin User
  const adminPasswordHash = await bcrypt.hash("AdminFlex2026!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@fundedflex.com" },
    update: {},
    create: {
      email: "admin@fundedflex.com",
      passwordHash: adminPasswordHash,
      name: "FundedFlex Operations Admin",
      role: "ADMIN",
    },
  });
  console.log("Admin user created/verified:", admin.email);

  // 2. Create Demo Customer
  const traderPasswordHash = await bcrypt.hash("TraderFlex2026!", 12);
  const trader = await prisma.user.upsert({
    where: { email: "trader@fundedflex.com" },
    update: {},
    create: {
      email: "trader@fundedflex.com",
      passwordHash: traderPasswordHash,
      name: "Alex Vance",
      role: "USER",
    },
  });
  console.log("Demo trader user created/verified:", trader.email);

  // 3. Create Account Packages ($5K to $200K)
  const products = [
    {
      name: "$5,000 Starter Account",
      slug: "5k-starter",
      accountSize: 5000,
      priceUSD: 49,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: false,
      sortOrder: 1,
    },
    {
      name: "$10,000 Explorer Account",
      slug: "10k-explorer",
      accountSize: 10000,
      priceUSD: 89,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: false,
      sortOrder: 2,
    },
    {
      name: "$25,000 Advanced Account",
      slug: "25k-advanced",
      accountSize: 25000,
      priceUSD: 189,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: false,
      sortOrder: 3,
    },
    {
      name: "$50,000 Pro Account",
      slug: "50k-pro",
      accountSize: 50000,
      priceUSD: 299,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: true, // Most popular
      sortOrder: 4,
    },
    {
      name: "$100,000 Master Account",
      slug: "100k-master",
      accountSize: 100000,
      priceUSD: 499,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: false,
      sortOrder: 5,
    },
    {
      name: "$200,000 Apex Account",
      slug: "200k-apex",
      accountSize: 200000,
      priceUSD: 949,
      dailyDrawdown: 5.0,
      maxDrawdown: 10.0,
      leverage: "1:100",
      profitTarget: 8.0,
      rewardSplit: "Up to 90%",
      minTradingDays: 3,
      tradingPeriod: "Unlimited",
      weekendHolding: true,
      newsTrading: true,
      eaTrading: true,
      platform: "FundedFlex Terminal / MT5",
      isFeatured: false,
      sortOrder: 6,
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`Seeded ${products.length} products.`);

  // 4. Create Payment Methods with realistic placeholders
  const paymentMethods = [
    {
      asset: "USDT",
      network: "TRC20",
      walletAddress: "TLkP67fundedflexTrc20AddressPlaceholderXX",
      instructions: "Send only Tether (USDT) on the TRON (TRC20) network. Transfers on other networks may result in loss of funds.",
      sortOrder: 1,
    },
    {
      asset: "USDT",
      network: "ERC20",
      walletAddress: "0x71C5A8fundedflexErc20AddressPlaceholderXX",
      instructions: "Send only Tether (USDT) on the Ethereum (ERC20) network. Ensure gas fees are factored into your transfer.",
      sortOrder: 2,
    },
    {
      asset: "USDC",
      network: "ERC20",
      walletAddress: "0x98A1B2fundedflexUsdcAddressPlaceholderXX",
      instructions: "Send only USD Coin (USDC) on the Ethereum (ERC20) network.",
      sortOrder: 3,
    },
    {
      asset: "BTC",
      network: "BITCOIN",
      walletAddress: "bc1qfundedflexofficialbtcaddressplaceholder",
      instructions: "Send native Bitcoin (BTC) to this SegWit address. Minimum 1 network confirmation required.",
      sortOrder: 4,
    },
    {
      asset: "ETH",
      network: "ETHEREUM",
      walletAddress: "0xFundedFlexOfficialEthAddressPlaceholderXX",
      instructions: "Send native Ethereum (ETH) directly to this address.",
      sortOrder: 5,
    },
  ];

  for (const pm of paymentMethods) {
    const existing = await prisma.paymentMethod.findFirst({
      where: { asset: pm.asset, network: pm.network },
    });
    if (existing) {
      await prisma.paymentMethod.update({
        where: { id: existing.id },
        data: pm,
      });
    } else {
      await prisma.paymentMethod.create({
        data: pm,
      });
    }
  }
  console.log(`Seeded ${paymentMethods.length} payment methods.`);

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
