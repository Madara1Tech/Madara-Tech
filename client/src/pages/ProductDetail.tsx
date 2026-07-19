import React, { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2, ShoppingCart, Tag } from "lucide-react";

export default function ProductDetail() {
  const [location, setLocation] = useLocation();
  const { t, isRTL } = useLanguage();
  const slug = location.split("/").pop() || "";
  const [quantity, setQuantity] = useState(1);

  const product = null;
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="container py-8">
          <Button className="btn-secondary mb-6" onClick={() => setLocation("/shop")}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة للمتجر
          </Button>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">المنتج غير موجود</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <Button className="btn-secondary mb-6" onClick={() => setLocation("/shop")}>
          <ArrowRight className="w-4 h-4 mr-2" />
          العودة للمتجر
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-muted/30 flex items-center justify-center min-h-96">
            <div className="text-center">
              <Tag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground">صورة المنتج</p>
            </div>
          </Card>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">اسم المنتج</h1>
              <p className="text-muted-foreground">الفئة: المنتجات الرقمية</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/50">
              <p className="text-muted-foreground text-sm mb-2">السعر</p>
              <p className="text-5xl font-bold text-accent">0 ر.س</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">الوصف</h3>
              <p className="text-muted-foreground">وصف المنتج سيظهر هنا</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4">الكمية</h3>
              <div className="flex items-center gap-4">
                <Button
                  className="btn-secondary"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <Button
                  className="btn-secondary"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </Card>

            <Button className="w-full btn-primary py-3 text-lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              أضف إلى السلة
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">منتجات ذات صلة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-4 hover:shadow-glow transition-all cursor-pointer">
                <div className="aspect-square bg-muted/30 rounded-lg mb-4 flex items-center justify-center">
                  <Tag className="w-8 h-8 text-muted-foreground opacity-50" />
                </div>
                <h3 className="font-bold mb-2">منتج #{i}</h3>
                <p className="text-muted-foreground text-sm mb-3">0 ر.س</p>
                <Button className="w-full btn-secondary text-sm">عرض</Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
