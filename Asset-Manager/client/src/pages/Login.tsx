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
          <CardHeader className="text-center pb-2 pt-8">
            <span className="text-[10px] tracking-[0.8em] text-primary font-mono uppercase mb-4 block opacity-60">
              The Agency
            </span>
            <h1 className="text-3xl font-display font-bold text-[#d4c5a9] tracking-widest uppercase mb-2">Identify Yourself</h1>
            <p className="text-[#a89984] text-sm italic opacity-60">"It is a capital mistake to theorize before one has data."</p>
          </CardHeader>
          <CardContent className="pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="prn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">ID / PRN</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Lead ID..." 
                          className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Access Code (DOB)</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="DDMMYYYY" 
                          className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12" 
                          {...field} 
                        />
                      </FormControl>
                      <p className="text-[10px] text-[#a89984]/40 font-mono uppercase tracking-widest mt-2">Format: DDMMYYYY</p>
                      <FormMessage className="text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 rounded-none h-12 uppercase tracking-[0.3em] text-xs shadow-lg transition-all duration-500"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Verifying..." : "Authorize Access"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-[#a89984] text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Not in the agency?{" "}
                    <Link href="/register" className="text-primary hover:underline underline-offset-4 font-bold">
                      Enrol Now
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
