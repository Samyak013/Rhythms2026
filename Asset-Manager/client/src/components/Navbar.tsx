import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Menu, X, User as UserIcon, LogOut, Ticket } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-bold tracking-[0.2em] text-foreground group-hover:text-primary transition-all duration-500 uppercase">
              RHYTHMS<span className="text-primary text-shadow-mystery">2026</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`relative font-medium text-sm tracking-wide transition-colors duration-200 hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.div 
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_var(--primary)]"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/tickets">
                  <Button variant="outline" size="sm" className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                    <Ticket className="w-4 h-4" />
                    My Tickets
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <UserIcon className="w-4 h-4" />
                  <span className="font-mono text-xs">{user.prn}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => logout()}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_-3px_var(--primary)] transition-all hover:scale-105">
                  Login / Register
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`block text-lg font-medium ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10">
                {user ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Signed in as <span className="text-foreground">{user.prn}</span>
                    </div>
                    <Link href="/tickets" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-start gap-2" variant="outline">
                        <Ticket className="w-4 h-4" /> My Tickets
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary text-primary-foreground">
                      Login / Register
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
