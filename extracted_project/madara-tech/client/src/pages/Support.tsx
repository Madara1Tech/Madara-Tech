import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { MessageSquare, Plus, Loader2, Send } from "lucide-react";

export default function Support() {
  const { t, isRTL } = useLanguage();
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { data: conversations, isLoading } = trpc.support.conversations.useQuery();

  const handleCreateConversation = () => {
    if (subject && message) {
      setSubject("");
      setMessage("");
      setShowNewConversation(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="container py-8">
        <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
          <h1 className="text-4xl font-bold mb-2">الدعم الفني</h1>
          <p className="text-muted-foreground">تواصل معنا بأي استفسار أو مشكلة</p>
        </div>

        <Button
          className="btn-primary mb-8"
          onClick={() => setShowNewConversation(!showNewConversation)}
        >
          <Plus className="w-4 h-4 mr-2" />
          محادثة جديدة
        </Button>

        {showNewConversation && (
          <Card className="p-6 mb-8 border-accent/50">
            <h3 className="text-lg font-bold mb-4">إنشاء محادثة جديدة</h3>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="موضوع المحادثة"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <textarea
                placeholder="اكتب رسالتك هنا..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-base min-h-32 resize-none"
              />
              <div className="flex gap-3">
                <Button className="flex-1 btn-primary" onClick={handleCreateConversation}>
                  <Send className="w-4 h-4 mr-2" />
                  إرسال
                </Button>
                <Button
                  className="flex-1 btn-secondary"
                  onClick={() => setShowNewConversation(false)}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div>
          <h3 className="text-2xl font-bold mb-4">المحادثات</h3>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : conversations && conversations.length > 0 ? (
            <div className="space-y-3">
              {conversations.map((conv) => (
                <Card
                  key={conv.id}
                  className="p-4 hover:shadow-glow transition-all cursor-pointer"
                  onClick={() => (window.location.href = `/support/${conv.id}`)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="font-bold">{conv.subject}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(conv.createdAt).toLocaleDateString("ar-SA")}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${
                        conv.status === "open"
                          ? "text-blue-500 bg-blue-500/10"
                          : "text-green-500 bg-green-500/10"
                      }`}
                    >
                      {conv.status === "open" ? "مفتوح" : "مغلق"}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">لا توجد محادثات بعد</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
