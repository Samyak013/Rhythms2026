import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-20">
         <span className="text-[10px] tracking-[0.5em] sm:tracking-[1em] text-primary font-mono uppercase mb-4 block opacity-60">
            The Detectives
          </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-[#d4c5a9] mb-4 tracking-[0.1em] sm:tracking-[0.2em] uppercase">The Yard's Core</h1>
        <p className="text-[#a89984] max-w-2xl mx-auto italic opacity-60">
          The brilliant minds orchestrating the investigation of RHYTHMS 2026.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10 mb-8 md:mb-12">
        {[
          { name: "Aditi Gaikwad", role: "Cultural Secretary", color: "from-amber-900 to-amber-700", phone: "+91-9867341309" },
          { name: "Sachin Shinde", role: "General Secretary", color: "from-slate-900 to-slate-700", phone: "+91-9146313028" },
          { name: "Samyak Bagesar", role: "Website Head", color: "from-blue-900 to-blue-700", phone: "+91-8928575445" },
          { name: "Atharva Avhad", role: "Website Co-head", color: "from-emerald-900 to-emerald-700" },
        ].map((member, i) => (
          <Card key={i} className="p-4 sm:p-6 md:p-10 bg-[#0e0c0a]/60 border-primary/10 rounded-none text-center group hover:border-primary/40 transition-all duration-700 overflow-hidden relative">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-4 sm:mb-6 md:mb-8 opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl`} />
            <h3 className="text-lg font-bold text-[#d4c5a9] font-display tracking-widest uppercase group-hover:text-primary transition-colors">{member.name}</h3>
            <p className="text-primary font-mono text-[10px] mt-2 uppercase tracking-[0.2em]">{member.role}</p>
            {member.phone && <p className="text-[#a89984]/40 text-[10px] mt-4 font-mono">{member.phone}</p>}
          </Card>
        ))}
      </div>

      {/* Core Members Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-24 max-w-5xl mx-auto">
        {[
          { name: "Manas Gotarne", role: "Core Member", color: "from-violet-900 to-violet-700" },
          { name: "Dhanya Shetty", role: "Core Member", color: "from-rose-900 to-rose-700" },
          { name: "Atharva Mula", role: "Core Member", color: "from-cyan-900 to-cyan-700" },
          { name: "Sujal Phalak", role: "Core Member", color: "from-orange-900 to-orange-700" },
          { name: "Tejas Nikam", role: "Core Member", color: "from-teal-900 to-teal-700" },
        ].map((member, i) => (
          <Card key={i} className="p-4 sm:p-5 md:p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none text-center group hover:border-primary/40 transition-all duration-700 overflow-hidden relative">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-3 sm:mb-4 md:mb-6 opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl`} />
            <h3 className="text-sm sm:text-base font-bold text-[#d4c5a9] font-display tracking-widest uppercase group-hover:text-primary transition-colors">{member.name}</h3>
            <p className="text-primary font-mono text-[9px] sm:text-[10px] mt-2 uppercase tracking-[0.2em]">{member.role}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 md:gap-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <a href="https://share.google/5bGtIX3jN5M7HPHC7" target="_blank" rel="noopener noreferrer" className="block">
          <Card className="p-5 sm:p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all text-center cursor-pointer">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-4 opacity-60" />
            <h3 className="font-bold text-xs mb-2 text-[#d4c5a9] uppercase tracking-widest">The Agency</h3>
            <p className="text-[#a89984]/60 text-[10px] uppercase font-mono leading-relaxed">
              A.C. Patil College,<br />Kharghar, Navi Mumbai
            </p>
          </Card>
          </a>

          <Card className="p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all text-center">
            <Mail className="w-6 h-6 text-primary mx-auto mb-4 opacity-60" />
            <h3 className="font-bold text-xs mb-2 text-[#d4c5a9] uppercase tracking-widest">Wire Us</h3>
            <p className="text-[#a89984]/60 text-[10px] uppercase font-mono">
              acpcerhythms@gmail.com
            </p>
          </Card>

          <Card className="p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-4 opacity-60" />
            <h3 className="font-bold text-xs mb-2 text-[#d4c5a9] uppercase tracking-widest">Dispatch</h3>
            <p className="text-[#a89984]/60 text-[10px] uppercase font-mono">
              +91 1234567891
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
