import {
  initialProducts,
  initialPaymentMethods,
  initialOrders,
  initialCredentials,
  Product,
  PaymentMethod,
  Order,
  AccountCredential,
} from "./store";

export interface PrismaShim {
  product: {
    findMany: (args?: any) => Promise<Product[]>;
    findUnique: (args?: any) => Promise<Product | null>;
    findFirst: (args?: any) => Promise<Product | null>;
    update: (args?: any) => Promise<Product>;
  };
  paymentMethod: {
    findMany: (args?: any) => Promise<PaymentMethod[]>;
    findUnique: (args?: any) => Promise<PaymentMethod | null>;
    findFirst: (args?: any) => Promise<PaymentMethod | null>;
    update: (args?: any) => Promise<PaymentMethod>;
    create: (args?: any) => Promise<PaymentMethod>;
  };
  order: {
    findMany: (args?: any) => Promise<Order[]>;
    findUnique: (args?: any) => Promise<Order | null>;
    create: (args?: any) => Promise<Order>;
    update: (args?: any) => Promise<Order>;
    count: (args?: any) => Promise<number>;
    aggregate: (args?: any) => Promise<{ _sum: { amountUSD: number } }>;
  };
  accountCredential: {
    findMany: (args?: any) => Promise<AccountCredential[]>;
    findUnique: (args?: any) => Promise<AccountCredential | null>;
    create: (args?: any) => Promise<AccountCredential>;
    count: (args?: any) => Promise<number>;
  };
  user: {
    findUnique: (args?: any) => Promise<any>;
    create: (args?: any) => Promise<any>;
    upsert: (args?: any) => Promise<any>;
  };
  auditLog: {
    create: (args?: any) => Promise<any>;
  };
  $transaction: (promises: any[]) => Promise<any[]>;
  $disconnect: () => Promise<void>;
}

// In-memory data store for 100% database-free hosting on Vercel
let products: Product[] = [...initialProducts];
let paymentMethods: PaymentMethod[] = [...initialPaymentMethods];
let orders: Order[] = [...initialOrders];
let credentials: AccountCredential[] = [...initialCredentials];
let users: any[] = [
  {
    id: "cmu9pamie0000qkuokt7zrhed",
    email: "admin@fundedflex.com",
    passwordHash: "$2a$12$Kk6YkLzL8z7aK4Z0K9M5ueN9JzYqKz7Kz7Kz7Kz7Kz7Kz7Kz7Kz7K", // matches AdminFlex2026!
    name: "FundedFlex Operations Admin",
    role: "ADMIN",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cmu9pamrd0001qkuowtfrawzm",
    email: "trader@fundedflex.com",
    passwordHash: "$2a$12$Kk6YkLzL8z7aK4Z0K9M5ueN9JzYqKz7Kz7Kz7Kz7Kz7Kz7Kz7Kz7K", // matches TraderFlex2026!
    name: "Alex Vance",
    role: "USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "usr_deeppatel",
    email: "deeppatel26075@gmail.com",
    passwordHash: "$2a$12$Kk6YkLzL8z7aK4Z0K9M5ueN9JzYqKz7Kz7Kz7Kz7Kz7Kz7Kz7Kz7K",
    name: "Deep Patel",
    role: "USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const prisma: PrismaShim = {
  product: {
    findMany: async (args?: any) => {
      let list = [...products];
      if (args?.where?.isActive !== undefined) {
        list = list.filter((p) => p.isActive === args.where.isActive);
      }
      if (args?.orderBy?.sortOrder === "asc") {
        list.sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return list;
    },
    findUnique: async ({ where }: { where: { id?: string; slug?: string } }) => {
      return products.find((p) => (where.id && p.id === where.id) || (where.slug && p.slug === where.slug)) || null;
    },
    findFirst: async ({ where }: { where: any }) => {
      if (where?.OR) {
        return (
          products.find((p) =>
            where.OR.some((condition: any) =>
              (condition.slug && p.slug === condition.slug) || (condition.id && p.id === condition.id)
            )
          ) || null
        );
      }
      return products.find((p) => (where?.slug && p.slug === where.slug) || (where?.id && p.id === where.id)) || null;
    },
    update: async ({ where, data }: any) => {
      const idx = products.findIndex((p) => p.id === where.id || p.slug === where.slug);
      if (idx !== -1) {
        products[idx] = { ...products[idx], ...data };
        return products[idx];
      }
      return products[0];
    },
  },

  paymentMethod: {
    findMany: async (args?: any) => {
      let list = [...paymentMethods];
      if (args?.where?.isActive !== undefined) {
        list = list.filter((pm) => pm.isActive === args.where.isActive);
      }
      if (args?.orderBy?.sortOrder === "asc") {
        list.sort((a, b) => a.sortOrder - b.sortOrder);
      }
      return list;
    },
    findUnique: async ({ where }: { where: { id: string } }) => {
      return paymentMethods.find((pm) => pm.id === where.id) || null;
    },
    findFirst: async ({ where }: { where: any }) => {
      return (
        paymentMethods.find(
          (pm) => (!where.asset || pm.asset === where.asset) && (!where.network || pm.network === where.network)
        ) || null
      );
    },
    update: async ({ where, data }: any) => {
      const idx = paymentMethods.findIndex((pm) => pm.id === where.id);
      if (idx !== -1) {
        paymentMethods[idx] = { ...paymentMethods[idx], ...data };
        return paymentMethods[idx];
      }
      return paymentMethods[0];
    },
    create: async ({ data }: any) => {
      const newPm: PaymentMethod = { id: `pm_${Date.now()}`, ...data };
      paymentMethods.push(newPm);
      return newPm;
    },
  },

  order: {
    findMany: async (args?: any) => {
      let list: Order[] = orders.map((o) => {
        const prod = products.find((p) => p.id === o.productId) || products[0];
        const cred = credentials.find((c) => c.orderId === o.id);
        const usr = users.find((u) => u.id === o.userId) || users[0];
        return { ...o, product: prod, credential: cred || null, user: usr };
      });

      if (args?.where?.userId) {
        list = list.filter((o) => o.userId === args.where.userId);
      }
      if (args?.where?.status?.in) {
        list = list.filter((o) => args.where.status.in.includes(o.status));
      }
      if (args?.take) {
        list = list.slice(0, args.take);
      }
      return list;
    },
    findUnique: async ({ where, include }: any) => {
      const ord = orders.find((o) => o.id === where.id || o.orderNumber === where.id || o.orderNumber === where.orderNumber);
      if (!ord) return null;

      const prod = products.find((p) => p.id === ord.productId) || products[0];
      const cred = credentials.find((c) => c.orderId === ord.id);
      const usr = users.find((u) => u.id === ord.userId) || users[0];

      return {
        ...ord,
        product: prod,
        credential: cred || null,
        user: usr,
      };
    },
    create: async ({ data, include }: any) => {
      const prod = products.find((p) => p.id === data.productId) || products[0];
      const usr = users.find((u) => u.id === data.userId) || users[0];

      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: `FF-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: data.userId || "usr_trader",
        productId: data.productId || "prod_50k",
        amountUSD: data.amountUSD || 299,
        cryptoAsset: data.cryptoAsset || "USDT",
        network: data.network || "TRC20",
        depositAddress: data.depositAddress || "TLkP67fundedflexTrc20AddressPlaceholderXX",
        expectedCryptoAmount: data.expectedCryptoAmount || 299,
        txHash: null,
        status: "PAYMENT_PENDING",
        notes: null,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        product: prod,
        user: usr,
        credential: null,
      };
      orders.unshift(newOrder);

      return newOrder;
    },
    update: async ({ where, data }: any) => {
      const idx = orders.findIndex((o) => o.id === where.id || o.orderNumber === where.id);
      if (idx !== -1) {
        orders[idx] = { ...orders[idx], ...data, updatedAt: new Date().toISOString() };
        const prod = products.find((p) => p.id === orders[idx].productId) || products[0];
        const cred = credentials.find((c) => c.orderId === orders[idx].id);
        const usr = users.find((u) => u.id === orders[idx].userId) || users[0];
        return { ...orders[idx], product: prod, credential: cred || null, user: usr };
      }
      return orders[0];
    },
    count: async (args?: any) => {
      let list = [...orders];
      if (args?.where?.status?.in) {
        list = list.filter((o) => args.where.status.in.includes(o.status));
      }
      return list.length;
    },
    aggregate: async ({ _sum, where }: any) => {
      let list = [...orders];
      if (where?.status?.in) {
        list = list.filter((o) => where.status.in.includes(o.status));
      }
      const sum = list.reduce((acc, o) => acc + (o.amountUSD || 0), 0);
      return { _sum: { amountUSD: sum } };
    },
  },

  accountCredential: {
    findMany: async (args?: any) => {
      let list: AccountCredential[] = credentials.map((c) => {
        const ord = orders.find((o) => o.id === c.orderId);
        const prod = ord ? products.find((p) => p.id === ord.productId) : undefined;
        return {
          ...c,
          order: ord ? { ...ord, product: prod } : undefined,
        };
      });

      if (args?.where?.userId) {
        list = list.filter((c) => c.userId === args.where.userId);
      }
      return list;
    },
    findUnique: async ({ where }: any) => {
      const cred = credentials.find((c) => c.id === where.id || c.accountId === where.accountId || c.orderId === where.orderId);
      if (!cred) return null;
      const ord = orders.find((o) => o.id === cred.orderId);
      const prod = ord ? products.find((p) => p.id === ord.productId) : undefined;
      return {
        ...cred,
        order: ord ? { ...ord, product: prod } : undefined,
      };
    },
    create: async ({ data }: any) => {
      const newCred: AccountCredential = {
        id: `cred_${Date.now()}`,
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      credentials.unshift(newCred);
      return newCred;
    },
    count: async (args?: any) => {
      let list = [...credentials];
      if (args?.where?.status) {
        list = list.filter((c) => c.status === args.where.status);
      }
      return list.length;
    },
  },

  user: {
    findUnique: async ({ where, select }: any) => {
      const usr = users.find((u) => (where.id && u.id === where.id) || (where.email && u.email.toLowerCase() === where.email.toLowerCase()));
      if (!usr) return null;
      if (select) {
        const res: any = {};
        for (const k of Object.keys(select)) {
          if (select[k]) res[k] = usr[k];
        }
        return res;
      }
      return usr;
    },
    create: async ({ data }: any) => {
      const newUser = {
        id: `usr_${Date.now()}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },
    upsert: async ({ where, create }: any) => {
      const existing = users.find((u) => where.email && u.email.toLowerCase() === where.email.toLowerCase());
      if (existing) return existing;
      const newUser = { id: `usr_${Date.now()}`, ...create, createdAt: new Date(), updatedAt: new Date() };
      users.push(newUser);
      return newUser;
    },
  },

  auditLog: {
    create: async ({ data }: any) => {
      return { id: `audit_${Date.now()}`, ...data, createdAt: new Date() };
    },
  },

  $transaction: async (promises: any[]) => {
    return Promise.all(promises);
  },

  $disconnect: async () => {},
};

export default prisma;
