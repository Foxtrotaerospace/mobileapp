import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import MobileNav from "@/components/MobileNav";
import Home from "@/pages/home";
import Feed from "@/pages/feed";
import Shop from "@/pages/shop";
import Learn from "@/pages/learn";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/feed" component={Feed} />
      <Route path="/shop" component={Shop} />
      <Route path="/learn" component={Learn} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <main className="pb-16">
          <Router />
        </main>
        <MobileNav />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
