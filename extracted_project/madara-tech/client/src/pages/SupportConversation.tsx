import React, { useState } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { ArrowRight, Loader2, Send } from "lucide-react";

export default function SupportConversation() {
  const [location, setLocation] = useLocation();
  const { t, isRTL } = useLanguage();
  const convId = parseInt(location.split("/").pop() || "0");
  const [message, setMessage] = useState("");

  const { data: conversation, isLoading } = trpc.support.conversations.useQuery();
  const currentConv = conversation?.find((c) => c.id === convId);
  const { data: messages } = trpc.support.getMessages.useQuery(convId);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pb-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!currentConv) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="container py-8">
          <Button className="btn-secondary mb-6" onClick={() => setLocation("/support")}>
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة للدعم
          </Button>
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">المحادثة غير موجودة</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <Button className="btn-secondary mb-6" onClick={() => setLocation("/support")}>
          <ArrowRight className="w-4 h-4 mr-2" />
          العودة للدعم
        </Button>

        <Card className="p-6 mb-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{currentConv?.subject}</h1>
              <p className="text-muted-foreground">
                {currentConv && new Date(currentConv.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </div>
            <span
              className={`text-lg font-bold px-4 py-2 rounded-lg ${
                currentConv?.status === "open"
                  ? "text-blue-500 bg-blue-500/10"
                  : "text-green-500 bg-green-500/10"
              }`}
            >
              {currentConv?.status === "open" ? "مفتوح" : "مغلق"}
            </span>
          </div>
        </Card>

        <Card className="p-6 mb-6 min-h-96 bg-muted/30">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages && messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderRole === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.senderRole === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-card text-card-foreground border border-[hsl(var(--border))]"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.createdAt).toLocaleTimeString("ar-SA")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد رسائل</p>
            )}
          </div>
        </Card>

        {currentConv?.status === "open" && (
          <Card className="p-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="اكتب رسالتك..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button className="btn-primary" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
