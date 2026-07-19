import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "ar" | "en" | "sa" | "sy" | "dz" | "tr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.wallet": "المحفظة",
    "nav.orders": "الطلبات",
    "nav.profile": "الحساب",

    // Home page
    "home.hero.title": "مرحباً بك في مادارا للتقنيات",
    "home.hero.subtitle": "منصة متكاملة لبيع المنتجات الرقمية",
    "home.cta.shop": "تسوق الآن",
    "home.cta.login": "دخول",
    "home.cta.signup": "إنشاء حساب",

    // Shop
    "shop.title": "المتجر",
    "shop.search": "ابحث عن منتج...",
    "shop.filter": "تصفية",
    "shop.sort": "ترتيب",
    "shop.price": "السعر",
    "shop.addToCart": "أضف إلى السلة",
    "shop.buy": "شراء الآن",

    // Wallet
    "wallet.title": "المحفظة",
    "wallet.balance": "الرصيد الحالي",
    "wallet.transactions": "سجل العمليات",
    "wallet.topup": "شحن الرصيد",
    "wallet.deposit": "إيداع",
    "wallet.withdrawal": "سحب",

    // Orders
    "orders.title": "الطلبات",
    "orders.status": "الحالة",
    "orders.date": "التاريخ",
    "orders.total": "الإجمالي",
    "orders.pending": "قيد المراجعة",
    "orders.completed": "مكتمل",
    "orders.cancelled": "ملغى",

    // Profile
    "profile.title": "الحساب",
    "profile.name": "الاسم",
    "profile.email": "البريد الإلكتروني",
    "profile.language": "اللغة",
    "profile.logout": "تسجيل خروج",
    "profile.settings": "الإعدادات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.success": "تم بنجاح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.back": "رجوع",

    // Home page additional
    "home.features.title": "لماذا مادارا؟",
    "home.features.digitalStore.title": "متجر رقمي",
    "home.features.digitalStore.desc": "تصفح وشراء المنتجات الرقمية بسهولة",
    "home.features.secureWallet.title": "محفظة آمنة",
    "home.features.secureWallet.desc": "إدارة رصيدك والعمليات المالية بأمان",
    "home.features.support.title": "دعم فني",
    "home.features.support.desc": "تواصل مع فريق الدعم في أي وقت",
    "home.features.security.title": "حماية عالية",
    "home.features.security.desc": "بيانات آمنة ومشفرة بأحدث التقنيات",
    "home.categories.title": "الفئات الشائعة",
    "home.cta.learnMore": "اعرف المزيد",
    "home.footer.support": "دعم واتساب",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.shop": "Shop",
    "nav.wallet": "Wallet",
    "nav.orders": "Orders",
    "nav.profile": "Profile",

    // Home page
    "home.hero.title": "Welcome to Madara Tech",
    "home.hero.subtitle": "Your integrated platform for digital products",
    "home.cta.shop": "Shop Now",
    "home.cta.login": "Login",
    "home.cta.signup": "Sign Up",

    // Shop
    "shop.title": "Shop",
    "shop.search": "Search for a product...",
    "shop.filter": "Filter",
    "shop.sort": "Sort",
    "shop.price": "Price",
    "shop.addToCart": "Add to Cart",
    "shop.buy": "Buy Now",

    // Wallet
    "wallet.title": "Wallet",
    "wallet.balance": "Current Balance",
    "wallet.transactions": "Transaction History",
    "wallet.topup": "Top Up Balance",
    "wallet.deposit": "Deposit",
    "wallet.withdrawal": "Withdrawal",

    // Orders
    "orders.title": "Orders",
    "orders.status": "Status",
    "orders.date": "Date",
    "orders.total": "Total",
    "orders.pending": "Pending",
    "orders.completed": "Completed",
    "orders.cancelled": "Cancelled",

    // Profile
    "profile.title": "Profile",
    "profile.name": "Name",
    "profile.email": "Email",
    "profile.language": "Language",
    "profile.logout": "Logout",
    "profile.settings": "Settings",

    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.back": "Back",

    // Home page additional
    "home.features.title": "Why Madara?",
    "home.features.digitalStore.title": "Digital Store",
    "home.features.digitalStore.desc": "Browse and buy digital products easily",
    "home.features.secureWallet.title": "Secure Wallet",
    "home.features.secureWallet.desc": "Manage your balance and financial transactions safely",
    "home.features.support.title": "Technical Support",
    "home.features.support.desc": "Contact the support team anytime",
    "home.features.security.title": "High Security",
    "home.features.security.desc": "Secure and encrypted data with the latest technologies",
    "home.categories.title": "Popular Categories",
    "home.cta.learnMore": "Learn More",
    "home.footer.support": "WhatsApp Support",
  },
  sa: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.wallet": "المحفظة",
    "nav.orders": "الطلبات",
    "nav.profile": "الحساب",

    // Home page
    "home.hero.title": "أهلاً وسهلاً في مادارا للتقنيات",
    "home.hero.subtitle": "منصتك المتكاملة لبيع المنتجات الرقمية",
    "home.cta.shop": "ابدأ التسوق",
    "home.cta.login": "دخول",
    "home.cta.signup": "إنشاء حساب",

    // Shop
    "shop.title": "المتجر",
    "shop.search": "ابحث عن منتج...",
    "shop.filter": "تصفية",
    "shop.sort": "ترتيب",
    "shop.price": "السعر",
    "shop.addToCart": "أضف إلى السلة",
    "shop.buy": "شراء الآن",

    // Wallet
    "wallet.title": "المحفظة",
    "wallet.balance": "الرصيد الحالي",
    "wallet.transactions": "سجل العمليات",
    "wallet.topup": "شحن الرصيد",
    "wallet.deposit": "إيداع",
    "wallet.withdrawal": "سحب",

    // Orders
    "orders.title": "الطلبات",
    "orders.status": "الحالة",
    "orders.date": "التاريخ",
    "orders.total": "الإجمالي",
    "orders.pending": "قيد المراجعة",
    "orders.completed": "مكتمل",
    "orders.cancelled": "ملغى",

    // Profile
    "profile.title": "الحساب",
    "profile.name": "الاسم",
    "profile.email": "البريد الإلكتروني",
    "profile.language": "اللغة",
    "profile.logout": "تسجيل خروج",
    "profile.settings": "الإعدادات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.success": "تم بنجاح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.back": "رجوع",

    // Home page additional
    "home.features.title": "لماذا مادارا؟",
    "home.features.digitalStore.title": "متجر رقمي",
    "home.features.digitalStore.desc": "تصفح وشراء المنتجات الرقمية بسهولة",
    "home.features.secureWallet.title": "محفظة آمنة",
    "home.features.secureWallet.desc": "إدارة رصيدك والعمليات المالية بأمان",
    "home.features.support.title": "دعم فني",
    "home.features.support.desc": "تواصل مع فريق الدعم في أي وقت",
    "home.features.security.title": "حماية عالية",
    "home.features.security.desc": "بيانات آمنة ومشفرة بأحدث التقنيات",
    "home.categories.title": "الفئات الشائعة",
    "home.cta.learnMore": "اعرف المزيد",
    "home.footer.support": "دعم واتساب",
  },
  sy: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.wallet": "المحفظة",
    "nav.orders": "الطلبات",
    "nav.profile": "الحساب",

    // Home page
    "home.hero.title": "أهلاً بك في مادارا للتقنيات",
    "home.hero.subtitle": "منصة متكاملة لبيع المنتجات الرقمية",
    "home.cta.shop": "ابدأ التسوق",
    "home.cta.login": "دخول",
    "home.cta.signup": "إنشاء حساب",

    // Shop
    "shop.title": "المتجر",
    "shop.search": "ابحث عن منتج...",
    "shop.filter": "تصفية",
    "shop.sort": "ترتيب",
    "shop.price": "السعر",
    "shop.addToCart": "أضف إلى السلة",
    "shop.buy": "شراء الآن",

    // Wallet
    "wallet.title": "المحفظة",
    "wallet.balance": "الرصيد الحالي",
    "wallet.transactions": "سجل العمليات",
    "wallet.topup": "شحن الرصيد",
    "wallet.deposit": "إيداع",
    "wallet.withdrawal": "سحب",

    // Orders
    "orders.title": "الطلبات",
    "orders.status": "الحالة",
    "orders.date": "التاريخ",
    "orders.total": "الإجمالي",
    "orders.pending": "قيد المراجعة",
    "orders.completed": "مكتمل",
    "orders.cancelled": "ملغى",

    // Profile
    "profile.title": "الحساب",
    "profile.name": "الاسم",
    "profile.email": "البريد الإلكتروني",
    "profile.language": "اللغة",
    "profile.logout": "تسجيل خروج",
    "profile.settings": "الإعدادات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.success": "تم بنجاح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.back": "رجوع",
  },
  dz: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.shop": "المتجر",
    "nav.wallet": "المحفظة",
    "nav.orders": "الطلبات",
    "nav.profile": "الحساب",

    // Home page
    "home.hero.title": "أهلا وسهلا بيك في مادارا للتقنيات",
    "home.hero.subtitle": "منصة متكاملة لبيع المنتجات الرقمية",
    "home.cta.shop": "ابدا التسوق",
    "home.cta.login": "دخول",
    "home.cta.signup": "انشاء حساب",

    // Shop
    "shop.title": "المتجر",
    "shop.search": "ادور على منتج...",
    "shop.filter": "تصفية",
    "shop.sort": "ترتيب",
    "shop.price": "السعر",
    "shop.addToCart": "زيد للسلة",
    "shop.buy": "اشري دابا",

    // Wallet
    "wallet.title": "المحفظة",
    "wallet.balance": "الرصيد الحالي",
    "wallet.transactions": "سجل العمليات",
    "wallet.topup": "شحن الرصيد",
    "wallet.deposit": "إيداع",
    "wallet.withdrawal": "سحب",

    // Orders
    "orders.title": "الطلبات",
    "orders.status": "الحالة",
    "orders.date": "التاريخ",
    "orders.total": "الإجمالي",
    "orders.pending": "قيد المراجعة",
    "orders.completed": "مكتمل",
    "orders.cancelled": "ملغى",

    // Profile
    "profile.title": "الحساب",
    "profile.name": "الاسم",
    "profile.email": "البريد الإلكتروني",
    "profile.language": "اللغة",
    "profile.logout": "خروج",
    "profile.settings": "الإعدادات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ",
    "common.success": "تم بنجاح",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.back": "رجوع",
  },
  tr: {
    // Navigation
    "nav.home": "Ana Sayfa",
    "nav.shop": "Mağaza",
    "nav.wallet": "Cüzdan",
    "nav.orders": "Siparişler",
    "nav.profile": "Profil",

    // Home page
    "home.hero.title": "Madara Tech'e Hoş Geldiniz",
    "home.hero.subtitle": "Dijital ürünler için entegre platformunuz",
    "home.cta.shop": "Şimdi Alışveriş Yap",
    "home.cta.login": "Giriş Yap",
    "home.cta.signup": "Kayıt Ol",

    // Home page additional
    "home.features.title": "Neden Madara?",
    "home.features.digitalStore.title": "Dijital Mağaza",
    "home.features.digitalStore.desc": "Dijital ürünleri kolayca inceleyin ve satın alın",
    "home.features.secureWallet.title": "Güvenli Cüzdan",
    "home.features.secureWallet.desc": "Bakiyenizi ve finansal işlemlerinizi güvenli yönetin",
    "home.features.support.title": "Teknik Destek",
    "home.features.support.desc": "Destek ekibiyle istediğiniz zaman iletişime geçin",
    "home.features.security.title": "Yüksek Güvenlik",
    "home.features.security.desc": "En son teknolojilerle güvenli ve şifreli veriler",
    "home.categories.title": "Popüler Kategoriler",
    "home.cta.learnMore": "Daha Fazla Bilgi",
    "home.footer.support": "WhatsApp Destek",

    // Shop
    "shop.title": "Mağaza",
    "shop.search": "Ürün ara...",
    "shop.filter": "Filtrele",
    "shop.sort": "Sırala",
    "shop.price": "Fiyat",
    "shop.addToCart": "Sepete Ekle",
    "shop.buy": "Şimdi Satın Al",

    // Wallet
    "wallet.title": "Cüzdan",
    "wallet.balance": "Mevcut Bakiye",
    "wallet.transactions": "İşlem Geçmişi",
    "wallet.topup": "Bakiye Yükle",
    "wallet.deposit": "Yatırma",
    "wallet.withdrawal": "Çekme",

    // Orders
    "orders.title": "Siparişler",
    "orders.status": "Durum",
    "orders.date": "Tarih",
    "orders.total": "Toplam",
    "orders.pending": "Beklemede",
    "orders.completed": "Tamamlandı",
    "orders.cancelled": "İptal Edildi",

    // Profile
    "profile.title": "Profil",
    "profile.name": "İsim",
    "profile.email": "E-posta",
    "profile.language": "Dil",
    "profile.logout": "Çıkış Yap",
    "profile.settings": "Ayarlar",

    // Common
    "common.loading": "Yükleniyor...",
    "common.error": "Bir hata oluştu",
    "common.success": "Başarılı",
    "common.cancel": "İptal",
    "common.save": "Kaydet",
    "common.delete": "Sil",
    "common.edit": "Düzenle",
    "common.back": "Geri",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ar");

  useEffect(() => {
    // Load saved language preference
    const saved = localStorage.getItem("language") as Language | null;
    if (saved && Object.keys(translations).includes(saved)) {
      setLanguageState(saved);
    }

    // Set HTML dir attribute
    const isLTR = saved === "en" || saved === "tr";
    document.documentElement.dir = isLTR ? "ltr" : "rtl";
    document.documentElement.lang = saved || "ar";
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    const isLTR = lang === "en" || lang === "tr";
    document.documentElement.dir = isLTR ? "ltr" : "rtl";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const isRTL = language !== "en" && language !== "tr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
