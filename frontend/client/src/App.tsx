import { Switch, Route, useLocation } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageDropdown } from "@/components/ui/language-dropdown";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Report from "@/pages/report";
import Forums from "@/pages/forums";
import Resources from "@/pages/resources";
import Landing from "@/pages/landing";
import LandingYouth from "@/pages/landing-youth";
import LandingElder from "@/pages/landing-elder";
import LandingLocalGov from "@/pages/landing-local-gov";
import LandingManagement from "@/pages/landing-management";
import LandingModerator from "@/pages/landing-moderator";
import SignUp from "@/pages/signup";
import Login from "@/pages/login";
import Chat from "@/pages/chat";
import Moderation from "@/pages/moderation";
import Analytics from "@/pages/analytics";
import MyReports from "@/pages/my-reports";
import LocalGovernmentLogin from "@/pages/local-government-login";
import LocalGovernmentSignUp from "@/pages/local-government-signup";
import TestAccounts from "@/pages/test-accounts";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { initializeTestAccounts } from "@/lib/test-accounts";
import { useEffect } from "react";

function ProtectedRoute({ component: Component, ...rest }: any) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!user) {
      setLocation("/landing");
    }
  }, [user, setLocation]);

  if (!user) return null;
  return <Component {...rest} />;
}

function Router() {
  const { user } = useAuth();
  const [location, setLocation] = useLocation();

  // Simple redirect logic if accessing protected routes while logged out
  useEffect(() => {
    const publicRoutes = [
      "/landing",
      "/landing/youth",
      "/landing/elder",
      "/landing/local-government",
      "/landing/management",
      "/landing/moderator",
      "/signup",
      "/login",
      "/local-government-login",
      "/local-government-signup",
      "/landing-moderator",
    ];
    if (!user && !publicRoutes.includes(location)) {
      setLocation("/landing");
    }
  }, [user, location, setLocation]);

  return (
    <Switch>
      <Route path="/landing" component={Landing} />
      <Route path="/landing/youth" component={LandingYouth} />
      <Route path="/landing/elder" component={LandingElder} />
      <Route path="/landing/local-government" component={LandingLocalGov} />
      <Route path="/landing-youth" component={LandingYouth} />
      <Route path="/landing-elder" component={LandingElder} />
      <Route path="/landing-local-gov" component={LandingLocalGov} />
      <Route path="/landing-management" component={LandingManagement} />
      <Route path="/landing-moderator" component={LandingModerator} />
      <Route path="/landing/moderator" component={LandingModerator} />
      <Route path="/test-accounts" component={TestAccounts} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/local-government-login" component={LocalGovernmentLogin} />
      <Route path="/local-government-signup" component={LocalGovernmentSignUp} />
      
      <Route path="/">
        {() => <ProtectedRoute component={Home} />}
      </Route>
      <Route path="/report">
        {() => <ProtectedRoute component={Report} />}
      </Route>
      <Route path="/forums">
        {() => <ProtectedRoute component={Forums} />}
      </Route>
      <Route path="/resources">
        {() => <ProtectedRoute component={Resources} />}
      </Route>
      <Route path="/chat">
         {() => <ProtectedRoute component={Chat} />}
      </Route>
      <Route path="/moderation">
         {() => <ProtectedRoute component={Moderation} />}
      </Route>
      <Route path="/analytics">
         {() => <ProtectedRoute component={Analytics} />}
      </Route>
      <Route path="/my-reports">
         {() => <ProtectedRoute component={MyReports} />}
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Initialize test accounts on app load
  useEffect(() => {
    initializeTestAccounts();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <ThemeToggle />
          <Router />
          <LanguageDropdown />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
