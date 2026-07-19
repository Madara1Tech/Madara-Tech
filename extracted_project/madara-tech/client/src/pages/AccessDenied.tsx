import React from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AccessDenied() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-24">
      <div className="container max-w-md">
        <Card className="p-8 text-center">
          <Lock className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">الوصول مرفوض</h1>
          <p className="text-muted-foreground mb-8">
            ليس لديك صلاحيات للوصول إلى هذه الصفحة
          </p>
          <Button
            className="w-full btn-primary"
            onClick={() => setLocation("/")}
          >
            العودة للرئيسية
          </Button>
        </Card>
      </div>
    </div>
  );
}
