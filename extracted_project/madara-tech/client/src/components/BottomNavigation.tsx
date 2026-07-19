import React from "react";
import { useLocation, useRoute } from "wouter";
import { Home, ShoppingBag, Wallet, Package, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

interface NavItem {
  id: string;
  path: string;
  icon: React.ReactNode;
  label: string;
  requiresAuth: boolean;
}

export function BottomNavigation() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const { t, isRTL } = useLanguage();

  const navItems: NavItem[] = [
    {
      id: "home",
      path: "/",
      icon: <Home className="w-6 h-6" />,
      label: t("nav.home"),
      requiresAuth: false,
    },
    {
      id: "shop",
      path: "/shop",
      icon: <ShoppingBag className="w-6 h-6" />,
      label: t("nav.shop"),
      requiresAuth: false,
    },
    {
      id: "wallet",
      path: "/wallet",
      icon: <Wallet className="w-6 h-6" />,
      label: t("nav.wallet"),
      requiresAuth: true,
    },
    {
      id: "orders",
      path: "/orders",
      icon: <Package className="w-6 h-6" />,
      label: t("nav.orders"),
      requiresAuth: true,
    },
    {
      id: "profile",
      path: "/profile",
      icon: <User className="w-6 h-6" />,
      label: t("nav.profile"),
      requiresAuth: true,
    },
  ];

  const handleNavClick = (item: NavItem) => {
    if (item.requiresAuth && !isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    window.location.href = item.path;
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return location === "/";
    }
    return location.startsWith(path);
  };

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-card border-t border-[hsl(var(--border))] shadow-lg ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="flex justify-around items-center h-20 max-w-7xl mx-auto px-4">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const disabled = item.requiresAuth && !isAuthenticated;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-all duration-300 ${
                active
                  ? "text-accent bg-accent/10"
                  : disabled
                    ? "text-muted-foreground opacity-50 cursor-not-allowed"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              title={item.label}
            >
              <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>
              <span className="text-xs mt-1 font-medium text-center truncate max-w-[60px]">
                {item.label}
              </span>
              {active && <div className="absolute bottom-0 w-8 h-1 bg-accent rounded-t-lg" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
