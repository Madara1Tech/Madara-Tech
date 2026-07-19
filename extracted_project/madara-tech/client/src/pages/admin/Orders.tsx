import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Eye, CheckCircle, XCircle } from "lucide-react";

export default function AdminOrders() {
  const { t, isRTL } = useLanguage();
  const [filterStatus, setFilterStatus] = useState("all");

  const { data: orders, isLoading } = trpc.orders.list.useQuery();

  const filteredOrders = orders?.filter((order: any) =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

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
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">إدارة الطلبات</h1>
          <p className="text-muted-foreground">إدارة جميع طلبات المستخدمين</p>
        </div>

        {/* Filter Buttons */}
        <Card className="p-4 flex gap-2 flex-wrap">
          <Button
            className={filterStatus === "all" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilterStatus("all")}
          >
            الكل
          </Button>
          <Button
            className={filterStatus === "pending" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilterStatus("pending")}
          >
            قيد المراجعة
          </Button>
          <Button
            className={filterStatus === "completed" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilterStatus("completed")}
          >
            مكتمل
          </Button>
          <Button
            className={filterStatus === "cancelled" ? "btn-primary" : "btn-secondary"}
            onClick={() => setFilterStatus("cancelled")}
          >
            ملغى
          </Button>
        </Card>

        {/* Orders Table */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : filteredOrders && filteredOrders.length > 0 ? (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-[hsl(var(--border))]">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-bold">رقم الطلب</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">المستخدم</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">المبلغ</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الحالة</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">التاريخ</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-[hsl(var(--border))] hover:bg-muted/30">
                      <td className="px-6 py-4 font-bold">#{order.id}</td>
                      <td className="px-6 py-4 text-muted-foreground">المستخدم</td>
                      <td className="px-6 py-4 font-bold text-accent">{order.totalPrice} ر.س</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button className="btn-secondary p-2" title="عرض">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {order.status === "pending" && (
                            <>
                              <Button className="btn-secondary p-2 text-green-500" title="قبول">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button className="btn-secondary p-2 text-red-500" title="رفض">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">لا توجد طلبات</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
