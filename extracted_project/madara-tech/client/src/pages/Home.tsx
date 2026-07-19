import React from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import {
  Zap,
  Shield,
  Wallet,
  MessageSquare,
  TrendingUp,
  Users,
  ShoppingCart,
  Lock,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: t("home.features.digitalStore.title"),
      description: t("home.features.digitalStore.desc"),
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: t("home.features.secureWallet.title"),
      description: t("home.features.secureWallet.desc"),
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: t("home.features.support.title"),
      description: t("home.features.support.desc"),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("home.features.security.title"),
      description: t("home.features.security.desc"),
    },
  ];

  const categories = [
    { name: "Nitro", icon: "⚡" },
    { name: "Subscriptions", icon: "📅" },
    { name: "Gift Cards", icon: "🎁" },
    { name: "Digital Services", icon: "💻" },
    { name: "Accounts", icon: "👤" },
    { name: "Game Services", icon: "🎮" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-4">
                {/* Logo */}
                <div className="mb-8">
                  <img
                    src="/manus-storage/file_0000000050e8720abde0db37d89fc013_1d36374f.png"
                    alt="Madara Tech Logo"
                    className="h-40 md:h-48 object-contain drop-shadow-2xl"
                  />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  <span className="text-gradient">مادارا</span>
                  <br />
                  للتقنيات
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  منصة متكاملة لبيع وشراء المنتجات الرقمية بأمان وسهولة
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <>
                    <Button
                      className="btn-primary"
                      onClick={() => (window.location.href = "/shop")}
                    >
                      ابدأ التسوق
                    </Button>
                    <Button
                      className="btn-secondary"
                      onClick={() => (window.location.href = "/profile")}
                    >
                      حسابي
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="btn-primary" onClick={() => (window.location.href = getLoginUrl())}>
                      دخول
                    </Button>
                    <Button
                      className="btn-secondary"
                      onClick={() => (window.location.href = getLoginUrl())}
                    >
                      إنشاء حساب
                    </Button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-accent">10K+</div>
                  <div className="text-sm text-muted-foreground">مستخدم نشط</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">منتج متاح</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-muted-foreground">دعم فني</div>
                </div>
              </div>
            </div>

            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="w-32 h-32 text-accent/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">منصة تسوق رقمية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("home.categories.title")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Card
                key={cat.name}
                className="p-6 text-center hover:shadow-glow transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <p className="font-medium text-sm">{cat.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">{t("home.features.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-6 hover:shadow-glow transition-all group">
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-accent/10 to-transparent">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">{t("home.cta.learnMore")}</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف المستخدمين الذين يثقون بمنصتنا للحصول على أفضل المنتجات الرقمية
          </p>
          {!isAuthenticated && (
            <Button
              className="btn-primary text-lg px-8 py-3"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              ابدأ الآن
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-[hsl(var(--border))] py-12 px-4">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">مادارا</h3>
              <p className="text-sm text-muted-foreground">
                منصة موثوقة لبيع وشراء المنتجات الرقمية
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">الروابط</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/shop" className="hover:text-accent transition-colors">
                    المتجر
                  </a>
                </li>
                <li>
                  <a href="/support" className="hover:text-accent transition-colors">
                    الدعم
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">القانونية</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    الشروط والأحكام
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    سياسة الخصوصية
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">التواصل</h4>
              <p className="text-sm text-muted-foreground mb-3">
                <a
                  href="https://wa.me/905312230774"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  واتساب: +90 531 223 07 74
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-[hsl(var(--border))] pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Madara Tech. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
