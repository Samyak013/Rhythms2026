import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Core Team</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the minds behind RHYTHMS 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-md text-center group hover-elevate">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 mx-auto mb-4 blur-sm group-hover:blur-none transition-all duration-500" />
          <h3 className="text-xl font-bold text-white">Aditi Gaikwad</h3>
          <p className="text-primary font-mono text-sm">Cultural Secretary</p>
          <p className="text-muted-foreground text-xs mt-2">+91 1234567891</p>
        </Card>

        <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-md text-center group hover-elevate">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 mx-auto mb-4 blur-sm group-hover:blur-none transition-all duration-500" />
          <h3 className="text-xl font-bold text-white">Sachin Shinde</h3>
          <p className="text-primary font-mono text-sm">General Secretary</p>
          <p className="text-muted-foreground text-xs mt-2">+91 1234567891</p>
        </Card>

        <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-md text-center group hover-elevate">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 mx-auto mb-4 blur-sm group-hover:blur-none transition-all duration-500" />
          <h3 className="text-xl font-bold text-white">Samyak Bagesar</h3>
          <p className="text-primary font-mono text-sm">Website Head</p>
        </Card>

        <Card className="p-8 bg-black/40 border-white/10 backdrop-blur-md text-center group hover-elevate">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-400 to-green-500 mx-auto mb-4 blur-sm group-hover:blur-none transition-all duration-500" />
          <h3 className="text-xl font-bold text-white">Atharva Avhad</h3>
          <p className="text-primary font-mono text-sm">Website Co-head</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {/* Contact Info */}
        <div className="space-y-8 max-w-2xl mx-auto w-full">
          <div className="grid gap-6">
            <Card className="p-6 bg-card/50 border-white/10 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Campus Location</h3>
                  <p className="text-muted-foreground text-sm">
                    A.C. Patil College of Engineering,<br />
                    Kharghar, Navi Mumbai
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-white/10 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Mail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm">
                    acpcerhythms@gmail.com
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 border-white/10 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-purple-500/10">
                  <Phone className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Student Coordinators</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Sachin Shinde (GS): +91 1234567891</p>
                    <p>Aditi Gaikwad (CS): +91 1234567891</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
