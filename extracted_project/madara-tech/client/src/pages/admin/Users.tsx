import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, Search, Edit2, Trash2, Shield } from "lucide-react";

export default function AdminUsers() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, isLoading } = trpc.admin.users.list.useQuery();

  const filteredUsers = users?.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">إدارة المستخدمين</h1>
          <p className="text-muted-foreground">إدارة جميع مستخدمي النظام</p>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-muted-foreground mt-2.5" />
            <Input
              type="text"
              placeholder="ابحث عن مستخدم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-[hsl(var(--border))]">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-bold">الاسم</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">البريد</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الدور</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">تاريخ الانضمام</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-[hsl(var(--border))] hover:bg-muted/30">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === "admin"
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.role === "admin" ? "مسؤول" : "مستخدم"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString("ar-SA")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button className="btn-secondary p-2" title="تعديل">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          {user.role !== "admin" && (
                            <Button className="btn-secondary p-2" title="ترقية لمسؤول">
                              <Shield className="w-4 h-4" />
                            </Button>
                          )}
                          <Button className="btn-secondary p-2 text-red-500" title="حذف">
                            <Trash2 className="w-4 h-4" />
                          </Button>
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
            <p className="text-muted-foreground">لا توجد مستخدمين</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
