import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Save, AlertCircle } from "lucide-react";

export default function AdminSettings() {
  const { t, isRTL } = useLanguage();
  const [settings, setSettings] = useState({
    siteName: "Madara Tech",
    siteDescription: "منصة رقمية متكاملة",
    maintenanceMode: false,
    allowRegistration: true,
    maxProductPrice: 10000,
    minProductPrice: 10,
    commissionPercentage: 5,
    notificationsEnabled: true,
    emailNotifications: true,
  });

  const handleSave = () => {
    console.log("Settings saved:", settings);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">الإعدادات</h1>
          <p className="text-muted-foreground">إدارة إعدادات المنصة</p>
        </div>

        {/* General Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">الإعدادات العامة</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الموقع</label>
              <Input
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">وصف الموقع</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="input-base min-h-24 resize-none"
              />
            </div>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">إعدادات النظام</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">وضع الصيانة</p>
                <p className="text-sm text-muted-foreground">تعطيل الموقع مؤقتاً</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenanceMode: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">السماح بالتسجيل</p>
                <p className="text-sm text-muted-foreground">السماح للمستخدمين الجدد بالتسجيل</p>
              </div>
              <Switch
                checked={settings.allowRegistration}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, allowRegistration: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">الإشعارات</p>
                <p className="text-sm text-muted-foreground">تفعيل الإشعارات</p>
              </div>
              <Switch
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notificationsEnabled: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-muted-foreground">إرسال إشعارات عبر البريد</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>
          </div>
        </Card>

        {/* Product Settings */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">إعدادات المنتجات</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">الحد الأدنى للسعر (ر.س)</label>
              <Input
                type="number"
                value={settings.minProductPrice}
                onChange={(e) =>
                  setSettings({ ...settings, minProductPrice: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الحد الأقصى للسعر (ر.س)</label>
              <Input
                type="number"
                value={settings.maxProductPrice}
                onChange={(e) =>
                  setSettings({ ...settings, maxProductPrice: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">نسبة العمولة (%)</label>
              <Input
                type="number"
                value={settings.commissionPercentage}
                onChange={(e) =>
                  setSettings({ ...settings, commissionPercentage: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-500/50 bg-red-500/5">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold text-red-500">منطقة الخطر</h2>
          </div>
          <div className="space-y-3">
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
              حذف جميع البيانات
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
              إعادة تعيين النظام
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full btn-primary py-3 text-lg" onClick={handleSave}>
          <Save className="w-5 h-5 mr-2" />
          حفظ الإعدادات
        </Button>
      </div>
    </DashboardLayout>
  );
}
