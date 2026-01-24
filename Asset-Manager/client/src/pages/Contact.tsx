import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
         <span className="text-[10px] tracking-[1em] text-primary font-mono uppercase mb-4 block opacity-60">
            The Detectives
          </span>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[#d4c5a9] mb-4 tracking-[0.2em] uppercase">The Yard's Core</h1>
        <p className="text-[#a89984] max-w-2xl mx-auto italic opacity-60">
          The brilliant minds orchestrating the investigation of RHYTHMS 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-24">
        {[
          { name: "Aditi Gaikwad", role: "Cultural Secretary", color: "from-amber-900 to-amber-700" },
          { name: "Sachin Shinde", role: "General Secretary", color: "from-slate-900 to-slate-700" },
          { name: "Samyak Bagesar", role: "Website Head", color: "from-blue-900 to-blue-700" },
          { name: "Atharva Avhad", role: "Website Co-head", color: "from-emerald-900 to-emerald-700" },
        ].map((member, i) => (
          <Card key={i} className="p-10 bg-[#0e0c0a]/60 border-primary/10 rounded-none text-center group hover:border-primary/40 transition-all duration-700 overflow-hidden relative">
            <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.color} mx-auto mb-8 opacity-40 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl`} />
            <h3 className="text-lg font-bold text-[#d4c5a9] font-display tracking-widest uppercase group-hover:text-primary transition-colors">{member.name}</h3>
            <p className="text-primary font-mono text-[10px] mt-2 uppercase tracking-[0.2em]">{member.role}</p>
            {i < 2 && <p className="text-[#a89984]/40 text-[10px] mt-4 font-mono">+91 1234567891</p>}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 bg-[#0e0c0a]/60 border-primary/10 rounded-none hover:border-primary/30 transition-all text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-4 opacity-60" />
            <h3 className="font-bold text-xs mb-2 text-[#d4c5a9] uppercase tracking-widest">The Agency</h3>
            <p className="text-[#a89984]/60 text-[10px] uppercase font-mono leading-relaxed">
              A.C. Patil College,<br />Kharghar, Navi Mumbai
            </p>
          </Card>

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
