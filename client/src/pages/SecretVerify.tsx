import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

export default function SecretVerify() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if first verification was completed
    const verified1 = sessionStorage.getItem("secret_verified_1");
    if (!verified1) {
      setLocation("/secret");
    }
  }, [setLocation]);

  const handleVerify = () => {
    if (code === "safa") {
      sessionStorage.setItem("secret_verified_2", "true");
      setLocation("/secret/final");
    } else {
      setError("الكود غير صحيح");
      setCode("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-24">
      <div className="container max-w-md">
        <Card className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">التحقق الثاني</h1>
          <p className="text-muted-foreground text-center mb-6">
            أدخل الكود مرة أخرى للتأكيد
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
              onClick={() => {
                sessionStorage.removeItem("secret_verified_1");
                setLocation("/profile");
              }}
            >
              إلغاء
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
