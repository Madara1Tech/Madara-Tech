import React, { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function SecretAccess() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  const handleVerify = () => {
    if (code === "safa") {
      sessionStorage.setItem("secret_verified_1", "true");
      setLocation("/secret/verify");
    } else {
      setError("الكود غير صحيح");
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-24">
      <div className="container max-w-md">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">التحقق الأول</h1>
          <p className="text-muted-foreground text-center mb-6">
            أدخل الكود للمتابعة إلى الخطوة التالية
          </p>

          <div className="space-y-4">
            <Input
              type="password"
              placeholder="أدخل الكود"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              onKeyPress={(e) => e.key === "Enter" && handleVerify()}
            />

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button className="w-full btn-primary" onClick={handleVerify}>
              تحقق
            </Button>
            <Button
              className="w-full btn-secondary"
              onClick={() => setLocation("/profile")}
            >
              إلغاء
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
