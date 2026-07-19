import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { ArrowDownLeft, ArrowUpRight, Plus, Loader2 } from "lucide-react";

export default function Wallet() {
  const { t, isRTL } = useLanguage();
  const [showTopup, setShowTopup] = useState(false);
  const [topupAmount, setTopupAmount] = useState("");

  const { data: balance, isLoading: balanceLoading } = trpc.wallet.getBalance.useQuery();
  const { data: transactions, isLoading: transactionsLoading } = trpc.wallet.getTransactions.useQuery();

  const handleTopup = () => {
    if (topupAmount) {
      setTopupAmount("");
      setShowTopup(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
          <h1 className="text-4xl font-bold mb-2">{t("wallet.title")}</h1>
          <p className="text-muted-foreground">إدارة رصيدك والعمليات المالية</p>
        </div>

        <Card className="p-8 bg-gradient-to-br from-accent/20 to-transparent border-accent/50 mb-8">
          <div className={`text-center ${isRTL ? "rtl" : "ltr"}`}>
            <p className="text-muted-foreground mb-2">{t("wallet.balance")}</p>
            {balanceLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
            ) : (
              <h2 className="text-5xl font-bold text-accent mb-6">
                {balance?.balance || "0"} ر.س
              </h2>
            )}
            <Button className="btn-primary" onClick={() => setShowTopup(!showTopup)}>
              <Plus className="w-4 h-4 mr-2" />
              {t("wallet.topup")}
            </Button>
          </div>
        </Card>

        {showTopup && (
          <Card className="p-6 mb-8 border-accent/50">
            <h3 className="text-lg font-bold mb-4">شحن الرصيد</h3>
            <div className="space-y-4">
              <Input
                type="number"
                placeholder="أدخل المبلغ"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                min="1"
              />
              <div className="flex gap-3">
                <Button className="flex-1 btn-primary" onClick={handleTopup}>
                  شحن
                </Button>
                <Button className="flex-1 btn-secondary" onClick={() => setShowTopup(false)}>
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-bold mb-4">{t("wallet.transactions")}</h3>
          {transactionsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <Card key={tx.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.type === "deposit"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}>
                      {tx.type === "deposit" ? (
                        <ArrowDownLeft className="w-6 h-6" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{tx.note || tx.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleDateString("ar-SA")}
                      </p>
                    </div>
                  </div>
                  <span className={`font-bold ${
                    tx.type === "deposit"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}>
                    {tx.type === "deposit" ? "+" : "-"}{tx.amount} ر.س
                  </span>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">لا توجد عمليات بعد</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
