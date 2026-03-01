import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Registration submitted successfully! / பதிவு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!");
    }, 1200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <div className="bg-card rounded-xl p-6 md:p-10" style={{ boxShadow: 'var(--shadow-card)' }}>
        <h2 className="text-2xl font-bold text-card-foreground mb-1 text-center">Membership Registration</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">உறுப்பினர் பதிவு படிவம்</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Personal Info */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="முழு பெயர்" required maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fatherName">Father / Husband Name *</Label>
              <Input id="fatherName" placeholder="தந்தை / கணவர் பெயர்" required maxLength={100} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input id="dob" type="date" required />
            </div>
            <div className="space-y-1.5">
              <Label>Gender *</Label>
              <Select required>
                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male / ஆண்</SelectItem>
                  <SelectItem value="female">Female / பெண்</SelectItem>
                  <SelectItem value="other">Other / மற்றவை</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mobile">Mobile Number *</Label>
              <Input id="mobile" type="tel" placeholder="கைபேசி எண்" required maxLength={15} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" type="tel" placeholder="வாட்ஸ்அப் எண்" maxLength={15} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="மின்னஞ்சல்" maxLength={255} />
          </div>

          {/* Location */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="district">District *</Label>
              <Input id="district" placeholder="மாவட்டம்" required maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="constituency">Assembly Constituency</Label>
              <Input id="constituency" placeholder="சட்டமன்ற தொகுதி" maxLength={100} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="panchayat">Panchayat / Ward</Label>
              <Input id="panchayat" placeholder="ஊராட்சி / வார்டு" maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" placeholder="அஞ்சல் குறியீடு" maxLength={6} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Full Address</Label>
            <Textarea id="address" placeholder="முழு முகவரி" maxLength={500} />
          </div>

          {/* Additional */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="தொழில்" maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="education">Education Qualification</Label>
              <Input id="education" placeholder="கல்வித் தகுதி" maxLength={100} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Interested in Volunteer Work?</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="தன்னார்வ பணி?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes / ஆம்</SelectItem>
                <SelectItem value="no">No / இல்லை</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="photo">Photo</Label>
              <Input id="photo" type="file" accept="image/*" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="idProof">ID Proof</Label>
              <Input id="idProof" type="file" accept="image/*,.pdf" />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 text-base h-12 font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Registration / பதிவு செய்"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
