import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function SecretFinal() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if both verification steps were completed
    const verified1 = sessionStorage.getItem("secret_verified_1");
    const verified2 = sessionStorage.getItem("secret_verified_2");
    if (!verified1 || !verified2) {
      setLocation("/secret");
    }
  }, [setLocation]);

  const handleReturn = () => {
    sessionStorage.removeItem("secret_verified_1");
    sessionStorage.removeItem("secret_verified_2");
    setLocation("/profile");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pb-24">
      <div className="container max-w-md">
        <Card className="p-8 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/50">
          <Heart className="w-16 h-16 text-accent mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold mb-4">اعترافات نرا لاحقن ما سنكت</h1>
          <p className="text-muted-foreground mb-8 text-sm">
            شكراً لك على الوصول إلى هذه الرسالة السرية. هذا المكان مخصص للرسائل الخاصة والمهمة.
          </p>
          <Button
            className="w-full btn-primary"
            onClick={handleReturn}
          >
            العودة
          </Button>
        </Card>
      </div>
    </div>
  );
}
