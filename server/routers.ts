import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { systemRouter } from "./_core/systemRouter";
import { TRPCError } from "@trpc/server";
import * as db from "./db";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,

  // ============ AUTH ROUTES ============
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============ CATEGORIES ============
  categories: router({
    list: publicProcedure.query(async () => {
      return await db.getCategories();
    }),

    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await db.getCategoryById(input);
    }),
  }),

  // ============ PRODUCTS ============
  products: router({
    list: publicProcedure
      .input(
        z.object({
          categoryId: z.number().optional(),
          limit: z.number().optional(),
          offset: z.number().optional(),
        })
      )
      .query(async ({ input }) => {
        return await db.getProducts(input.categoryId, input.limit, input.offset);
      }),

    getById: publicProcedure.input(z.number()).query(async ({ input }) => {
      return await db.getProductById(input);
    }),

    getBySlug: publicProcedure.input(z.string()).query(async ({ input }) => {
      return await db.getProductBySlug(input);
    }),

    // Admin only
    create: adminProcedure
      .input(
        z.object({
          title: z.string(),
          slug: z.string(),
          shortDescription: z.string().optional(),
          fullDescription: z.string().optional(),
          price: z.string(),
          imageUrl: z.string().optional(),
          categoryId: z.number(),
          productType: z.enum(["digital_code", "subscription", "service", "account", "other"]),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement create product
        return { success: true };
      }),

    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().optional(),
          price: z.string().optional(),
          status: z.enum(["active", "inactive", "archived"]).optional(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement update product
        return { success: true };
      }),

    delete: adminProcedure.input(z.number()).mutation(async ({ input }) => {
      // TODO: Implement delete product
      return { success: true };
    }),
  }),

  // ============ ORDERS ============
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserOrders(ctx.user.id);
    }),

    getById: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const order = await db.getOrderById(input);
      if (!order || order.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return order;
    }),

    getItems: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const order = await db.getOrderById(input);
      if (!order || order.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getOrderItems(input);
    }),

    create: protectedProcedure
      .input(
        z.object({
          items: z.array(
            z.object({
              productId: z.number(),
              quantity: z.number().default(1),
            })
          ),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement create order
        return { success: true, orderId: 0 };
      }),

    // Admin only
    allOrders: adminProcedure.query(async () => {
      return await db.getAllOrders();
    }),

    updateStatus: adminProcedure
      .input(
        z.object({
          orderId: z.number(),
          status: z.enum(["pending", "approved", "rejected", "completed", "cancelled"]),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement update order status
        return { success: true };
      }),
  }),

  // ============ WALLET ============
  wallet: router({
    getBalance: protectedProcedure.query(async ({ ctx }) => {
      const user = await db.getUserById(ctx.user.id);
      return { balance: user?.balance || "0" };
    }),

    getTransactions: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserWalletTransactions(ctx.user.id);
    }),

    // Admin only
    addBalance: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          amount: z.string(),
          note: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement add balance
        return { success: true };
      }),

    deductBalance: adminProcedure
      .input(
        z.object({
          userId: z.number(),
          amount: z.string(),
          note: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement deduct balance
        return { success: true };
      }),
  }),

  // ============ NOTIFICATIONS ============
  notifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserNotifications(ctx.user.id);
    }),

    markAsRead: protectedProcedure.input(z.number()).mutation(async ({ input, ctx }) => {
      // TODO: Verify notification belongs to user
      await db.markNotificationAsRead(input);
      return { success: true };
    }),
  }),

  // ============ SUPPORT ============
  support: router({
    conversations: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserSupportConversations(ctx.user.id);
    }),

    getConversation: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const conversation = await db.getSupportConversationById(input);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return conversation;
    }),

    getMessages: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
      const conversation = await db.getSupportConversationById(input);
      if (!conversation || conversation.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return await db.getSupportMessages(input);
    }),

    createConversation: protectedProcedure
      .input(
        z.object({
          subject: z.string(),
          message: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement create conversation
        return { success: true, conversationId: 0 };
      }),

    sendMessage: protectedProcedure
      .input(
        z.object({
          conversationId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement send message
        return { success: true };
      }),

    // Admin only
    allConversations: adminProcedure.query(async () => {
      return await db.getAllSupportConversations();
    }),

    sendAdminReply: adminProcedure
      .input(
        z.object({
          conversationId: z.number(),
          message: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // TODO: Implement admin reply
        return { success: true };
      }),
  }),

  // ============ USER PROFILE ============
  profile: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserById(ctx.user.id);
    }),

    update: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          avatar: z.string().optional(),
          preferredLanguage: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement update profile
        return { success: true };
      }),

    changePassword: protectedProcedure
      .input(
        z.object({
          currentPassword: z.string(),
          newPassword: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // TODO: Implement change password
        return { success: true };
      }),
  }),

  // ============ ADMIN DASHBOARD ============
  admin: router({
    stats: adminProcedure.query(async () => {
      return await db.getDashboardStats();
    }),

    users: router({
      list: adminProcedure.query(async () => {
        return await db.getAllUsers();
      }),

      getById: adminProcedure.input(z.number()).query(async ({ input }) => {
        return await db.getUserById(input);
      }),

      updateRole: adminProcedure
        .input(
          z.object({
            userId: z.number(),
            role: z.enum(["user", "admin"]),
          })
        )
        .mutation(async ({ input }) => {
          await db.updateUserRole(input.userId, input.role);
          return { success: true };
        }),

      updateStatus: adminProcedure
        .input(
          z.object({
            userId: z.number(),
            status: z.enum(["active", "banned", "suspended"]),
          })
        )
        .mutation(async ({ input }) => {
          await db.updateUserStatus(input.userId, input.status);
          return { success: true };
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
