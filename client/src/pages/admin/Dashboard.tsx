import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Loader2,
  MessageSquare,
  Wallet,
} from "lucide-react";

export default function AdminDashboard() {
  const { t, isRTL } = useLanguage();

  // TODO: Implement statistics queries
  const stats = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    supportTickets: 0,
  };

  const StatCard = ({ icon: Icon, label, value, color = "accent" }: any) => (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className={`text-3xl font-bold text-${color}`}>{value}</p>
        </div>
        <div className={`w-12 h-12 bg-${color}/20 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}`} />
        </div>
      </div>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً بك في لوحة تحكم مادارا تك</p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={Users} label="إجمالي المستخدمين" value={stats.totalUsers} />
          <StatCard icon={Package} label="إجمالي المنتجات" value={stats.totalProducts} />
          <StatCard icon={ShoppingCart} label="إجمالي الطلبات" value={stats.totalOrders} />
          <StatCard
            icon={Wallet}
            label="إجمالي الإيرادات"
            value={`${stats.totalRevenue} ر.س`}
          />
          <StatCard
            icon={TrendingUp}
            label="الطلبات المعلقة"
            value={stats.pendingOrders}
            color="yellow"
          />
          <StatCard
            icon={MessageSquare}
            label="تذاكر الدعم"
            value={stats.supportTickets}
            color="blue"
          />
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">الإجراءات السريعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Button className="btn-primary">إضافة منتج</Button>
            <Button className="btn-primary">عرض الطلبات</Button>
            <Button className="btn-primary">إدارة المستخدمين</Button>
            <Button className="btn-primary">الإعدادات</Button>
          </div>
        </Card>

        {/* Recent Orders */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">الطلبات الأخيرة</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-bold">الطلب #{i}</p>
                  <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                </div>
                <p className="font-bold text-accent">0 ر.س</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Support Tickets */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">تذاكر الدعم الأخيرة</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-bold">تذكرة #{i}</p>
                  <p className="text-sm text-muted-foreground">مفتوحة</p>
                </div>
                <Button className="btn-secondary text-sm">رد</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
