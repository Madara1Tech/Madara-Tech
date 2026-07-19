import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  categories,
  products,
  orders,
  orderItems,
  walletTransactions,
  notifications,
  supportConversations,
  supportMessages,
  digitalCodes,
  adminSettings,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ USER OPERATIONS ============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod", "avatar", "preferredLanguage"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? undefined;
      if (normalized !== undefined) {
        (values as any)[field] = normalized;
        updateSet[field] = normalized;
      }
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(users).orderBy(desc(users.createdAt));
}

export async function updateUserBalance(userId: number, newBalance: string | number) {
  const db = await getDb();
  if (!db) return false;

  await db.update(users).set({ balance: String(newBalance) }).where(eq(users.id, userId));
  return true;
}

export async function updateUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) return false;

  await db.update(users).set({ role }).where(eq(users.id, userId));
  return true;
}

export async function updateUserStatus(userId: number, status: "active" | "banned" | "suspended") {
  const db = await getDb();
  if (!db) return false;

  await db.update(users).set({ status }).where(eq(users.id, userId));
  return true;
}

// ============ CATEGORY OPERATIONS ============

export async function getCategories() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(categories).orderBy(categories.name);
}

export async function getCategoryById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(categories).where(eq(categories.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ PRODUCT OPERATIONS ============

export async function getProducts(categoryId?: number, limit?: number, offset?: number) {
  const db = await getDb();
  if (!db) return [];

  const conditions = categoryId
    ? and(eq(products.status, "active"), eq(products.categoryId, categoryId))
    : eq(products.status, "active");

  const query = db.select().from(products).where(conditions).orderBy(desc(products.createdAt));

  if (limit !== undefined && offset !== undefined) {
    return await query.limit(limit).offset(offset);
  } else if (limit !== undefined) {
    return await query.limit(limit);
  } else if (offset !== undefined) {
    return await query.offset(offset);
  }

  return await query;
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ============ ORDER OPERATIONS ============

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));
}

export async function getOrderById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(orders).orderBy(desc(orders.createdAt));
}

// ============ WALLET OPERATIONS ============

export async function getUserWalletTransactions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(walletTransactions)
    .where(eq(walletTransactions.userId, userId))
    .orderBy(desc(walletTransactions.createdAt));
}

// ============ NOTIFICATION OPERATIONS ============

export async function getUserNotifications(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt));
}

export async function markNotificationAsRead(notificationId: number) {
  const db = await getDb();
  if (!db) return false;

  await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, notificationId));
  return true;
}

// ============ SUPPORT OPERATIONS ============

export async function getUserSupportConversations(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(supportConversations)
    .where(eq(supportConversations.userId, userId))
    .orderBy(desc(supportConversations.createdAt));
}

export async function getSupportConversationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(supportConversations)
    .where(eq(supportConversations.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getSupportMessages(conversationId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(supportMessages)
    .where(eq(supportMessages.conversationId, conversationId))
    .orderBy(supportMessages.createdAt);
}

export async function getAllSupportConversations() {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(supportConversations).orderBy(desc(supportConversations.createdAt));
}

// ============ DIGITAL CODES OPERATIONS ============

export async function getAvailableDigitalCodes(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(digitalCodes)
    .where(and(eq(digitalCodes.productId, productId), eq(digitalCodes.status, "available")));
}

export async function assignDigitalCode(codeId: number, orderId: number) {
  const db = await getDb();
  if (!db) return false;

  await db
    .update(digitalCodes)
    .set({ status: "used", assignedOrderId: orderId, usedAt: new Date() })
    .where(eq(digitalCodes.id, codeId));
  return true;
}

// ============ ADMIN SETTINGS ============

export async function getAdminSettings() {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(adminSettings).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateAdminSettings(data: Partial<typeof adminSettings.$inferInsert>) {
  const db = await getDb();
  if (!db) return false;

  const existing = await getAdminSettings();
  if (existing) {
    await db.update(adminSettings).set(data).where(eq(adminSettings.id, existing.id));
  } else {
    await db.insert(adminSettings).values(data as any);
  }
  return true;
}

// ============ STATS OPERATIONS ============

export async function getDashboardStats() {
  const db = await getDb();
  if (!db) return null;

  try {
    const userCount = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users)
      .then((r) => r[0]?.count || 0);

    const productCount = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(products)
      .then((r) => r[0]?.count || 0);

    const orderCount = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(orders)
      .then((r) => r[0]?.count || 0);

    const totalRevenue = await db
      .select({ total: sql<number>`SUM(totalPrice)` })
      .from(orders)
      .where(eq(orders.status, "completed"))
      .then((r) => r[0]?.total || 0);

    return {
      userCount,
      productCount,
      orderCount,
      totalRevenue,
    };
  } catch (error) {
    console.error("[Database] Failed to get dashboard stats:", error);
    return null;
  }
}
