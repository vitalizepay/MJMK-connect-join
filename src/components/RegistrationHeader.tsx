import mjmkLogo from "@/assets/mjmk-logo.png";
import leaderPhoto from "@/assets/leader-photo.jpg";

const RegistrationHeader = () => {
  return (
    <header className="relative overflow-hidden py-12 px-6 text-center text-primary-foreground" style={{ background: 'var(--gradient-header)' }}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-2xl mx-auto flex items-center justify-center gap-6">
        <img src={leaderPhoto} alt="எஸ். இப்ராஹீம் பாதுஷா" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/80 shadow-lg flex-shrink-0" />
        <div className="flex-1 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            எஸ். இப்ராஹீம் பாதுஷா
          </h1>
          <h2 className="text-lg md:text-xl font-semibold mb-1 opacity-95" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            மக்கள் ஜனநாயக முன்னேற்ற கழகம் (MJMK)
          </h2>
          <p className="text-sm md:text-base opacity-90 mt-3" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>
            தமிழ்நாடு உறுப்பினர் பதிவு
          </p>
        </div>
        <img src={mjmkLogo} alt="MJMK Logo" className="w-24 h-24 md:w-32 md:h-32 rounded-lg bg-white/90 p-1 shadow-lg flex-shrink-0" />
      </div>
    </header>
  );
};

export default RegistrationHeader;
