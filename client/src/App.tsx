import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Wallet from "./pages/Wallet";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import Support from "./pages/Support";
import SupportConversation from "./pages/SupportConversation";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminSettings from "./pages/admin/Settings";
import SecretAccess from "./pages/SecretAccess";
import SecretVerify from "./pages/SecretVerify";
import SecretFinal from "./pages/SecretFinal";
import { BottomNavigation } from "./components/BottomNavigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/shop"} component={Shop} />
      <Route path={"/shop/:slug"} component={ProductDetail} />

      {/* Protected User Routes */}
      <Route path={"/wallet"}>
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      </Route>
      <Route path={"/orders"}>
        <ProtectedRoute>
          <Orders />
        </ProtectedRoute>
      </Route>
      <Route path={"/orders/:id"}>
        <ProtectedRoute>
          <OrderDetail />
        </ProtectedRoute>
      </Route>
      <Route path={"/profile"}>
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      </Route>
      <Route path={"/support"}>
        <ProtectedRoute>
          <Support />
        </ProtectedRoute>
      </Route>
      <Route path={"/support/:id"}>
        <ProtectedRoute>
          <SupportConversation />
        </ProtectedRoute>
      </Route>

      {/* Admin Routes */}
      <Route path={"/admin"}>
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin/users"}>
        <ProtectedRoute requiredRole="admin">
          <AdminUsers />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin/products"}>
        <ProtectedRoute requiredRole="admin">
          <AdminProducts />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin/orders"}>
        <ProtectedRoute requiredRole="admin">
          <AdminOrders />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin/settings"}>
        <ProtectedRoute requiredRole="admin">
          <AdminSettings />
        </ProtectedRoute>
      </Route>

      {/* Secret Routes */}
      <Route path={"/secret"} component={SecretAccess} />
      <Route path={"/secret/verify"} component={SecretVerify} />
      <Route path={"/secret/final"} component={SecretFinal} />

      {/* Error Routes */}
      <Route path={"/access-denied"} component={AccessDenied} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen bg-background text-foreground pb-24">
              <Router />
              <BottomNavigation />
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
