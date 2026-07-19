import React from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2, Package } from "lucide-react";

export default function OrderDetail() {
  const [location, setLocation] = useLocation();
  const { t, isRTL } = useLanguage();
  const orderId = parseInt(location.split("/").pop() || "0");

  const { data: order, isLoading } = trpc.orders.getById.useQuery(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="container py-8">
          <Button className="btn-secondary mb-6" onClick={() => setLocation("/orders")}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة للطلبات
          </Button>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">الطلب غير موجود</p>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-500 bg-yellow-500/10";
      case "completed":
        return "text-green-500 bg-green-500/10";
      case "cancelled":
        return "text-red-500 bg-red-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد المراجعة";
      case "completed":
        return "مكتمل";
      case "cancelled":
        return "ملغى";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <Button className="btn-secondary mb-6" onClick={() => setLocation("/orders")}>
          <ArrowRight className="w-4 h-4 mr-2" />
          العودة للطلبات
        </Button>

        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-transparent border-accent/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">الطلب #{order.id}</h1>
              <p className="text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
            <span className={`text-lg font-bold px-4 py-2 rounded-lg ${getStatusColor(order.status)}`}>
              {getStatusLabel(order.status)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm">المبلغ الإجمالي</p>
              <p className="text-2xl font-bold text-accent">{order.totalPrice} ر.س</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">حالة الدفع</p>
              <p className="text-lg font-bold">{order.paymentStatus}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">عناصر الطلب</h2>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <Package className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">لا توجد عناصر</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">سجل الطلب</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-3 h-3 bg-accent rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-bold">تم إنشاء الطلب</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString("ar-SA")}
                </p>
              </div>
            </div>
            {order.status === "completed" && (
              <div className="flex gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-bold">تم إكمال الطلب</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.updatedAt).toLocaleString("ar-SA")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>

        {order.notes && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">ملاحظات</h2>
            <p className="text-muted-foreground">{order.notes}</p>
          </Card>
        )}
      </div>
    </div>
  );
}
