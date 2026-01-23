import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const loginSchema = z.object({
  prn: z.string().min(5, "PRN is required"),
  dob: z.string().length(8, "DOB must be in DDMMYYYY format"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoggingIn, user } = useAuth();
  const [_, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      prn: "",
      dob: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <h1 className="text-3xl font-display font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to access your dashboard</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="prn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PRN / Roll Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your college PRN" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth (Password)</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="DDMMYYYY" className="bg-white/5 border-white/10 text-white" {...field} />
                      </FormControl>
                      <p className="text-xs text-muted-foreground">Format: DDMMYYYY (e.g., 05032002)</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-semibold shadow-[0_0_15px_-5px_var(--primary)]"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Authenticating..." : "Login"}
                </Button>

                <div className="text-center mt-4 text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-primary hover:underline font-medium">
                    Register Here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
