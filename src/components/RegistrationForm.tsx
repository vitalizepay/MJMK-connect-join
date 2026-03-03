import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { tamilNaduDistricts, assemblyConstituencies } from "@/data/locationData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gender, setGender] = useState("");
  const [district, setDistrict] = useState("");
  const [constituency, setConstituency] = useState("");
  const [volunteer, setVolunteer] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [idProofFile, setIdProofFile] = useState<File | null>(null);
  const [panCardFile, setPanCardFile] = useState<File | null>(null);

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
    const { error } = await supabase.storage.from('registration-uploads').upload(fileName, file);
    if (error) {
      console.error('Upload error:', error);
      return null;
    }
    const { data } = supabase.storage.from('registration-uploads').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Upload files
      let photoUrl: string | null = null;
      let idProofUrl: string | null = null;
      let panCardUrl: string | null = null;

      if (photoFile) photoUrl = await uploadFile(photoFile, 'photos');
      if (idProofFile) idProofUrl = await uploadFile(idProofFile, 'id-proofs');
      if (panCardFile) panCardUrl = await uploadFile(panCardFile, 'pan-cards');

      const { error } = await supabase.from('registrations').insert({
        full_name: formData.get('fullName') as string,
        father_name: formData.get('fatherName') as string,
        date_of_birth: formData.get('dob') as string,
        gender,
        aadhaar_number: (formData.get('aadhaar') as string) || null,
        pan_number: (formData.get('pan') as string) || null,
        voter_id: (formData.get('voterId') as string) || null,
        mobile: formData.get('mobile') as string,
        whatsapp: (formData.get('whatsapp') as string) || null,
        email: (formData.get('email') as string) || null,
        district: district || null,
        assembly_constituency: constituency || null,
        panchayat_ward: (formData.get('panchayat') as string) || null,
        pincode: (formData.get('pincode') as string) || null,
        full_address: (formData.get('address') as string) || null,
        occupation: (formData.get('occupation') as string) || null,
        education: (formData.get('education') as string) || null,
        volunteer_interest: volunteer || null,
        photo_url: photoUrl,
        id_proof_url: idProofUrl,
        pan_card_url: panCardUrl,
      });

      if (error) throw error;

      toast.success("Registration submitted successfully! / பதிவு வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!");
      form.reset();
      setGender("");
      setDistrict("");
      setConstituency("");
      setVolunteer("");
      setPhotoFile(null);
      setIdProofFile(null);
      setPanCardFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again. / பதிவு தோல்வியடைந்தது.");
    } finally {
      setIsSubmitting(false);
    }
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
              <Label htmlFor="fullName">Full Name * / முழு பெயர்</Label>
              <Input id="fullName" name="fullName" placeholder="முழு பெயர்" required maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fatherName">Father / Husband Name * / தந்தை / கணவர் பெயர்</Label>
              <Input id="fatherName" name="fatherName" placeholder="தந்தை / கணவர் பெயர்" required maxLength={100} />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="dob">Date of Birth * / பிறந்த தேதி</Label>
              <Input id="dob" name="dob" type="date" required />
            </div>
            <div className="space-y-1.5">
              <Label>Gender * / பாலினம்</Label>
              <Select required value={gender} onValueChange={setGender}>
                <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male / ஆண்</SelectItem>
                  <SelectItem value="female">Female / பெண்</SelectItem>
                  <SelectItem value="other">Other / மற்றவை</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ID Documents */}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="aadhaar">Aadhaar Number / ஆதார் எண்</Label>
              <Input id="aadhaar" name="aadhaar" placeholder="ஆதார் எண்" maxLength={12} pattern="\d{12}" title="Enter 12-digit Aadhaar number" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pan">PAN Number / PAN எண்</Label>
              <Input id="pan" name="pan" placeholder="PAN எண்" maxLength={10} className="uppercase" pattern="[A-Za-z]{5}[0-9]{4}[A-Za-z]" title="Enter valid PAN (e.g. ABCDE1234F)" onChange={(e) => { e.target.value = e.target.value.toUpperCase(); }} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="voterId">Voter ID / வாக்காளர் அட்டை</Label>
              <Input id="voterId" name="voterId" placeholder="வாக்காளர் அட்டை எண்" maxLength={10} />
            </div>
          </div>

          {/* Contact */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mobile">Mobile Number * / கைபேசி எண்</Label>
              <Input id="mobile" name="mobile" type="tel" placeholder="கைபேசி எண்" required maxLength={15} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="whatsapp">WhatsApp Number / வாட்ஸ்அப் எண்</Label>
              <Input id="whatsapp" name="whatsapp" type="tel" placeholder="வாட்ஸ்அப் எண்" maxLength={15} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email / மின்னஞ்சல்</Label>
            <Input id="email" name="email" type="email" placeholder="மின்னஞ்சல்" maxLength={255} />
          </div>

          {/* Location */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>District / மாவட்டம்</Label>
              <Select value={district} onValueChange={setDistrict}>
                <SelectTrigger><SelectValue placeholder="மாவட்டம் தேர்வு செய்க" /></SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-60">
                    {tamilNaduDistricts.map((d) => (
                      <SelectItem key={d} value={d}>{d}</SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Assembly Constituency / சட்டமன்ற தொகுதி</Label>
              <Select value={constituency} onValueChange={setConstituency}>
                <SelectTrigger><SelectValue placeholder="தொகுதி தேர்வு செய்க" /></SelectTrigger>
                <SelectContent>
                  <ScrollArea className="h-60">
                    {assemblyConstituencies.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="panchayat">Panchayat / Ward / ஊராட்சி</Label>
              <Input id="panchayat" name="panchayat" placeholder="ஊராட்சி / வார்டு" maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pincode">Pincode / அஞ்சல் குறியீடு</Label>
              <Input id="pincode" name="pincode" placeholder="அஞ்சல் குறியீடு" maxLength={6} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Full Address / முழு முகவரி</Label>
            <Textarea id="address" name="address" placeholder="முழு முகவரி" maxLength={500} />
          </div>

          {/* Additional */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="occupation">Occupation / தொழில்</Label>
              <Input id="occupation" name="occupation" placeholder="தொழில்" maxLength={100} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="education">Education / கல்வித் தகுதி</Label>
              <Input id="education" name="education" placeholder="கல்வித் தகுதி" maxLength={100} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Interested in Volunteer Work? / தன்னார்வ பணி?</Label>
            <Select value={volunteer} onValueChange={setVolunteer}>
              <SelectTrigger><SelectValue placeholder="தன்னார்வ பணி?" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes / ஆம்</SelectItem>
                <SelectItem value="no">No / இல்லை</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Uploads */}
          <div className="grid gap-5 md:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="photo">Photo / புகைப்படம்</Label>
              <Input id="photo" type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="idProof">ID Proof / அடையாள ஆவணம்</Label>
              <Input id="idProof" type="file" accept="image/*,.pdf" onChange={(e) => setIdProofFile(e.target.files?.[0] || null)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="panCard">PAN Card / PAN அட்டை</Label>
              <Input id="panCard" type="file" accept="image/*,.pdf" onChange={(e) => setPanCardFile(e.target.files?.[0] || null)} />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4 text-base h-12 font-semibold" disabled={isSubmitting}>
            {isSubmitting ? "Submitting... / சமர்ப்பிக்கிறது..." : "Submit Registration / பதிவு செய்"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
