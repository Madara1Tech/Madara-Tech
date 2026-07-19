import React, { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { User, LogOut, Settings, Lock, Globe } from "lucide-react";
import { useLocation } from "wouter";

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [, setLocation] = useLocation();
  const [showSecretButton, setShowSecretButton] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground mb-4">يرجى تسجيل الدخول أولاً</p>
        <Button className="btn-primary" onClick={() => setLocation("/")}>
          العودة للرئيسية
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const languages = [
    { code: "ar", name: "العربية" },
    { code: "en", name: "English" },
    { code: "sa", name: "السعودية" },
    { code: "sy", name: "السورية" },
    { code: "dz", name: "الجزائرية" },
    { code: "tr", name: "Türkçe" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
          <h1 className="text-4xl font-bold mb-2">{t("profile.title")}</h1>
          <p className="text-muted-foreground">إدارة حسابك والإعدادات</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-accent to-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-1">{user?.name || "مستخدم"}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user?.email}</p>
              <div className="space-y-2">
                <Button
                  className="w-full btn-primary"
                  onClick={() => setShowSecretButton(!showSecretButton)}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  الإعدادات
                </Button>
                <Button className="w-full btn-secondary" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  {t("profile.logout")}
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                {t("profile.language")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`p-3 rounded-lg transition-all ${
                      language === lang.code
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                بيانات الحساب
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">{t("profile.name")}</label>
                  <Input type="text" value={user?.name || ""} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">{t("profile.email")}</label>
                  <Input type="email" value={user?.email || ""} disabled />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                الأمان
              </h3>
              <Button className="btn-secondary">
                <Lock className="w-4 h-4 mr-2" />
                تغيير كلمة المرور
              </Button>
            </Card>

            {showSecretButton && (
              <Card className="p-6 border-yellow-500/50 bg-yellow-500/5">
                <button
                  onClick={() => (window.location.href = "/secret")}
                  className="w-full py-3 px-4 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-600 rounded-lg font-medium transition-colors border border-yellow-500/50"
                >
                  فزر لاتضغطع
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
