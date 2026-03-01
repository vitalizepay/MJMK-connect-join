import RegistrationHeader from "@/components/RegistrationHeader";
import RegistrationForm from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader />
      <RegistrationForm />
      <footer className="text-center py-6 text-sm text-muted-foreground">
        © 2026 மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK) — All Rights Reserved
      </footer>
    </div>
  );
};

export default Index;
