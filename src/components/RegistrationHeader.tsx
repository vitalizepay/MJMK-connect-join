import mjmkLogo from "@/assets/mjmk-logo.png";

const RegistrationHeader = () => {
  return (
    <header className="relative overflow-hidden py-12 px-6 text-center text-primary-foreground" style={{ background: 'var(--gradient-header)' }}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
        <img src={mjmkLogo} alt="MJMK Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-white/90 p-1 shadow-lg" />
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK)
          </h1>
          <p className="text-sm md:text-base opacity-90 mt-3" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            தமிழ்நாடு உறுப்பினர் பதிவு
          </p>
        </div>
      </div>
    </header>
  );
};

export default RegistrationHeader;
