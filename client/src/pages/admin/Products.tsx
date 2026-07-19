import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Loader2, Search, Plus, Edit2, Trash2, Eye } from "lucide-react";

export default function AdminProducts() {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewProduct, setShowNewProduct] = useState(false);

  const { data: products, isLoading } = trpc.products.list.useQuery({});

  const filteredProducts = products?.filter(
    (product: any) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">إدارة المنتجات</h1>
            <p className="text-muted-foreground">إدارة جميع منتجات المتجر</p>
          </div>
          <Button className="btn-primary" onClick={() => setShowNewProduct(!showNewProduct)}>
            <Plus className="w-4 h-4 mr-2" />
            منتج جديد
          </Button>
        </div>

        {/* New Product Form */}
        {showNewProduct && (
          <Card className="p-6 border-accent/50">
            <h3 className="text-lg font-bold mb-4">إضافة منتج جديد</h3>
            <div className="space-y-4">
              <Input type="text" placeholder="اسم المنتج" />
              <textarea placeholder="الوصف" className="input-base min-h-24 resize-none" />
              <Input type="number" placeholder="السعر" />
              <div className="flex gap-3">
                <Button className="flex-1 btn-primary">حفظ</Button>
                <Button className="flex-1 btn-secondary" onClick={() => setShowNewProduct(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Search */}
        <Card className="p-4">
          <div className="flex gap-2">
            <Search className="w-5 h-5 text-muted-foreground mt-2.5" />
            <Input
              type="text"
              placeholder="ابحث عن منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Card>

        {/* Products Table */}
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-[hsl(var(--border))]">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-bold">الاسم</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الفئة</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">السعر</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">النوع</th>
                    <th className="px-6 py-3 text-right text-sm font-bold">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product: any) => (
                    <tr key={product.id} className="border-b border-[hsl(var(--border))] hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{product.categoryId}</td>
                      <td className="px-6 py-4 font-bold text-accent">{product.price} ر.س</td>
                      <td className="px-6 py-4 text-sm">{product.type}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Button className="btn-secondary p-2" title="عرض">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button className="btn-secondary p-2" title="تعديل">
                            <Edit2 className="w-4 h-4" />
                          </Button>
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
            <p className="text-muted-foreground">لا توجد منتجات</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
