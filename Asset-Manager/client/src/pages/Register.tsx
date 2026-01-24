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
        <Card className="bg-[#0e0c0a]/60 backdrop-blur-xl border-primary/10 rounded-none shadow-2xl">
          <CardHeader className="text-center pb-2 pt-8">
            <span className="text-[10px] tracking-[0.8em] text-primary font-mono uppercase mb-4 block opacity-60">
              The Agency
            </span>
            <h1 className="text-3xl font-display font-bold text-[#d4c5a9] tracking-widest uppercase mb-2">New Enrolment</h1>
            <p className="text-[#a89984] text-sm italic opacity-60">"The little things are infinitely the most important."</p>
          </CardHeader>
          <CardContent className="pb-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter identity..." className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12" {...field} />
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="prn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">ID / PRN</FormLabel>
                        <FormControl>
                          <Input placeholder="Lead ID..." className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12" {...field} />
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
                          <Input placeholder="DDMMYYYY" className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12" {...field} />
                        </FormControl>
                        <FormMessage className="text-[10px] uppercase" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Base of Operations</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12">
                            <SelectValue placeholder="Select Mumbai College" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0e0c0a] border-primary/20 rounded-none">
                            {MUMBAI_COLLEGES.map((college) => (
                              <SelectItem key={college} value={college} className="text-[#a89984] focus:bg-primary/10 focus:text-primary">
                                {college}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="branch"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Specialization</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="bg-[#0a0806] border-primary/20 focus:border-primary text-[#d4c5a9] rounded-none h-12">
                            <SelectValue placeholder="Select Branch" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0e0c0a] border-primary/20 rounded-none">
                            {BRANCHES.map((branch) => (
                              <SelectItem key={branch} value={branch} className="text-[#a89984] focus:bg-primary/10 focus:text-primary">
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-[10px] uppercase" />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/80 h-12 mt-4 uppercase tracking-[0.3em] text-xs rounded-none shadow-lg transition-all duration-500"
                  disabled={isRegistering}
                >
                  {isRegistering ? "Unveiling Identity..." : "Seal File"}
                </Button>

                <div className="text-center mt-6">
                  <p className="text-[#a89984] text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Already part of the agency?{" "}
                    <Link href="/login" className="text-primary hover:underline underline-offset-4 font-bold">
                      Login
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
