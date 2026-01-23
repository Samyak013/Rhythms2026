import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type InsertUser } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

const MUMBAI_COLLEGES = [
  "A.C. Patil College of Engineering, Kharghar",
  "Vasantdada Patil Pratishthan's College of Engineering",
  "K. J. Somaiya College of Engineering",
  "Sardar Patel Institute of Technology",
  "Dwarkadas J. Sanghvi College of Engineering",
  "Veermata Jijabai Technological Institute (VJTI)",
  "Institute of Chemical Technology (ICT)",
  "Fr. Conceicao Rodrigues College of Engineering",
  "Thadomal Shahani Engineering College",
  "Don Bosco Institute of Technology",
  "M. H. Saboo Siddik College of Engineering",
  "Rizvi College of Engineering",
  "Atharva College of Engineering",
  "St. Francis Institute of Technology",
  "Terna Engineering College",
  "Datta Meghe College of Engineering",
  "Pillai College of Engineering",
  "MGM's College of Engineering and Technology",
  "Bharati Vidyapeeth College of Engineering",
  "Saraswati College of Engineering",
];

const BRANCHES = [
  "Computer Science & Engineering",
  "Information Technology",
  "Artificial Intelligence & Data Science",
  "Computer Science & Design",
  "Electronics & Telecommunication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Instrumentation Engineering",
  "Chemical Engineering",
];

export default function Register() {
  const { register, isRegistering, user } = useAuth();
  const [_, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      name: "",
      prn: "",
      dob: "",
      college: "",
      branch: "",
    },
  });

  const onSubmit = (data: InsertUser) => {
    register(data, {
      onSuccess: () => setLocation("/login"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-black z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <h1 className="text-3xl font-display font-bold text-white mb-1 tracking-widest">JOIN THE RHYTHM</h1>
            <p className="text-sm text-muted-foreground font-mono italic">Create your mysterious identity</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-tighter">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-tighter">PRN / Roll No</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all" {...field} />
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
                        <FormLabel className="text-xs uppercase tracking-tighter">DOB (Password)</FormLabel>
                        <FormControl>
                          <Input placeholder="DDMMYYYY" className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-tighter">College Name</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all">
                            <SelectValue placeholder="Select Mumbai College" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/10">
                            {MUMBAI_COLLEGES.map((college) => (
                              <SelectItem key={college} value={college} className="text-white hover:bg-white/10">
                                {college}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-tighter">Branch</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all">
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent className="bg-neutral-900 border-white/10">
                            {BRANCHES.map((branch) => (
                              <SelectItem key={branch} value={branch} className="text-white hover:bg-white/10">
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 mt-4 text-base font-bold tracking-widest shadow-[0_0_20px_-5px_var(--primary)] transition-all active:scale-95"
                  disabled={isRegistering}
                >
                  {isRegistering ? "UNVEILING..." : "CREATE IDENTITY"}
                </Button>

                <div className="text-center mt-4 text-xs text-muted-foreground uppercase tracking-widest">
                  Already part of the rhythm?{" "}
                  <Link href="/login" className="text-primary hover:underline font-bold">
                    Login
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
