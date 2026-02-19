import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/Navbar";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import Sponsors from "@/pages/Sponsors";
import Tickets from "@/pages/Tickets";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <PageTransition>
            <Home />
          </PageTransition>
        </Route>
        <Route path="/about">
          <PageTransition>
            <About />
          </PageTransition>
        </Route>
        <Route path="/events">
          <PageTransition>
            <Events />
          </PageTransition>
        </Route>
        <Route path="/sponsors">
          <PageTransition>
            <Sponsors />
          </PageTransition>
        </Route>
        <Route path="/tickets">
          <PageTransition>
            <Tickets />
          </PageTransition>
        </Route>
        <Route path="/contact">
          <PageTransition>
            <Contact />
          </PageTransition>
        </Route>
        <Route path="/login">
          <PageTransition>
            <Login />
          </PageTransition>
        </Route>
        <Route path="/register">
          <PageTransition>
            <Register />
          </PageTransition>
        </Route>
        <Route>
          <PageTransition>
            <NotFound />
          </PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

// Wrapper for smooth page transitions
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-grow">
          <Router />
        </main>
        
        {/* Simple Footer */}
        <footer className="border-t border-white/5 bg-black/80 py-8 text-center text-sm text-muted-foreground backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4">
            <p className="tracking-widest font-mono text-xs uppercase">&copy; 2026 RHYTHMS. The legend unfolds.</p>
            <p className="mt-2 text-[10px] opacity-30 uppercase tracking-[0.2em]">Designed for A.C. Patil College of Engineering</p>
          </div>
        </footer>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
